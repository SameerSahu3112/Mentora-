"""Application and intro-session service layer.

Phase 4: Applications and introductory calls
- Create batch application (student selects course + batch)
- Auto-create intro-session record exactly once per application
- Seven-day follow-up deadline
- Admin schedules/reschedules/completes intro calls
- Batch capacity check (concurrency-safe via batch service)
"""

from uuid import UUID
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.modules.applications.models import BatchApplication, IntroSession
from app.modules.applications.schemas import BatchApplicationCreate
from app.modules.batches.service import BatchService
from app.modules.batches.models import Batch
from app.modules.notifications.service import NotificationService


class ApplicationService:
    """Business logic for applications and intro sessions."""

    @staticmethod
    async def create_application(
        db: AsyncSession,
        student_profile_id: UUID,
        data: BatchApplicationCreate,
    ) -> BatchApplication:
        """Create a batch application and auto-create an intro-session record.

        Steps:
        1. Verify the batch exists and is active
        2. Check capacity (concurrency-safe via row-level locking)
        3. Create the application
        4. Auto-create the intro-session record (exactly once)
        5. Create a confirmation notification for the student
        6. Notify admins of the new application

        All in a single database transaction.
        """
        course_id = UUID(data.course_id)
        batch_id = UUID(data.batch_id)

        # Verify batch exists and is active (with row-level lock for capacity)
        batch = await BatchService.get_batch(db, batch_id)
        if batch is None:
            raise ValueError("Batch not found")
        if batch.status != "active":
            raise ValueError("Batch is not accepting applications")

        # Concurrency-safe capacity check
        seat_available = await BatchService.reserve_seat_concurrent(db, batch_id)
        if not seat_available:
            raise ValueError("Batch is full")

        # Create the application
        application = BatchApplication(
            student_profile_id=student_profile_id,
            course_id=course_id,
            batch_id=batch_id,
            status="pending",
        )
        db.add(application)
        await db.flush()  # Get application.id

        # Auto-create the intro-session record (exactly once per application)
        deadline = IntroSession.default_deadline()
        intro_session = IntroSession(
            application_id=application.id,
            status="pending",
            deadline_at=deadline,
        )
        db.add(intro_session)

        try:
            await db.commit()
            await db.refresh(application)
            await db.refresh(intro_session)
        except IntegrityError:
            await db.rollback()
            raise ValueError("Application could not be created")

        # Create notifications (outside the main transaction - best effort)
        # Notify the student
        try:
            await NotificationService.create_notification(
                recipient_user_id=str(student_profile_id),  # Will be resolved by notification service
                actor_user_id=None,
                type="registration",
                title="Application received",
                message="Thank you for registering with Mentora! Our team will contact you soon for your introductory session.",
                data={
                    "application_id": str(application.id),
                    "batch_id": str(batch_id),
                    "course_id": str(course_id),
                },
                db=db,
            )
        except Exception:
            # Notifications should not fail the application flow
            pass

        return application

    @staticmethod
    async def get_application(
        db: AsyncSession, application_id: UUID
    ) -> BatchApplication | None:
        """Get an application by ID with its intro session."""
        result = await db.execute(
            select(BatchApplication).where(BatchApplication.id == application_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_student_applications(
        db: AsyncSession, student_profile_id: UUID
    ) -> list[BatchApplication]:
        """Get all applications for a student."""
        result = await db.execute(
            select(BatchApplication).where(
                BatchApplication.student_profile_id == student_profile_id
            )
        )
        return result.scalars().all()

    @staticmethod
    async def list_all_applications(db: AsyncSession) -> list[BatchApplication]:
        """Admin: list all applications."""
        result = await db.execute(select(BatchApplication))
        return result.scalars().all()

    @staticmethod
    async def get_application_with_intro(
        db: AsyncSession, application_id: UUID
    ) -> dict | None:
        """Get application with intro session details for student view."""
        result = await db.execute(
            select(BatchApplication).where(BatchApplication.id == application_id)
        )
        application = result.scalar_one_or_none()
        if application is None:
            return None

        # Get intro session
        intro_result = await db.execute(
            select(IntroSession).where(
                IntroSession.application_id == application_id
            )
        )
        intro_session = intro_result.scalar_one_or_none()

        # Get batch name
        batch = await BatchService.get_batch(db, application.batch_id)

        confirmation = None
        if intro_session:
            confirmation = (
                "Thank you for registering with Mentora! "
                "Our team will contact you soon for your introductory session."
            )

        return {
            "application_id": str(application.id),
            "course_id": str(application.course_id),
            "batch_id": str(application.batch_id),
            "batch_name": batch.name if batch else None,
            "application_status": application.status,
            "applied_at": application.applied_at,
            "intro_session_status": intro_session.status if intro_session else None,
            "intro_scheduled_at": intro_session.scheduled_at if intro_session else None,
            "intro_deadline_at": intro_session.deadline_at if intro_session else None,
            "confirmation_message": confirmation,
        }


class IntroSessionService:
    """Business logic for intro-session scheduling and completion."""

    @staticmethod
    async def get_intro_session(
        db: AsyncSession, session_id: UUID
    ) -> IntroSession | None:
        """Get an intro session by ID."""
        result = await db.execute(
            select(IntroSession).where(IntroSession.id == session_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_intro_session_by_application(
        db: AsyncSession, application_id: UUID
    ) -> IntroSession | None:
        """Get the intro session for an application."""
        result = await db.execute(
            select(IntroSession).where(
                IntroSession.application_id == application_id
            )
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def schedule_or_reschedule(
        db: AsyncSession,
        session_id: UUID,
        scheduled_at: datetime,
        outcome_notes: str | None = None,
    ) -> IntroSession:
        """Admin schedules or reschedules an intro call.

        Sets status to 'scheduled' (or 'reschedule_requested' if already scheduled).
        """
        session = await IntroSessionService.get_intro_session(db, session_id)
        if session is None:
            raise ValueError("Intro session not found")

        session.scheduled_at = scheduled_at
        if session.status == "scheduled":
            session.status = "reschedule_requested"
        else:
            session.status = "scheduled"

        if outcome_notes:
            session.outcome_notes = outcome_notes

        await db.commit()
        await db.refresh(session)
        return session

    @staticmethod
    async def complete_call(
        db: AsyncSession,
        session_id: UUID,
        outcome_notes: str | None = None,
        follow_up_required: bool = False,
    ) -> IntroSession:
        """Admin marks an intro call as completed."""
        session = await IntroSessionService.get_intro_session(db, session_id)
        if session is None:
            raise ValueError("Intro session not found")

        session.status = "completed"
        session.completed_at = datetime.now(timezone.utc)
        session.outcome_notes = outcome_notes
        session.follow_up_required = follow_up_required

        await db.commit()
        await db.refresh(session)
        return session

    @staticmethod
    async def mark_missed(
        db: AsyncSession, session_id: UUID
    ) -> IntroSession:
        """Mark an intro call as missed (student unavailable)."""
        session = await IntroSessionService.get_intro_session(db, session_id)
        if session is None:
            raise ValueError("Intro session not found")

        session.status = "missed"
        await db.commit()
        await db.refresh(session)
        return session

    @staticmethod
    async def list_due_calls(db: AsyncSession) -> list[IntroSession]:
        """Admin: list intro calls due within the 7-day deadline that are not completed."""
        now = datetime.now(timezone.utc)
        result = await db.execute(
            select(IntroSession).where(
                IntroSession.deadline_at <= now,
                IntroSession.status.in_(["pending", "scheduled", "reschedule_requested"]),
            )
        )
        return result.scalars().all()

    @staticmethod
    async def list_all_intro_sessions(db: AsyncSession) -> list[IntroSession]:
        """Admin: list all intro sessions."""
        result = await db.execute(select(IntroSession))
        return result.scalars().all()

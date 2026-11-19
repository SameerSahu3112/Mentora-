"""Mentorship service layer.

Phase 7: Mentorship and attendance
- Weekly mentorship schedules (Admin-managed, recurring)
- Weekly mentorship sessions (individual occurrences)
- One-to-one mentorship bookings (student → teacher, teacher approves)
- Attendance for weekly sessions and one-to-one bookings
"""

from uuid import UUID
from datetime import datetime, timezone, date, timedelta, time as dt_time
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from sqlalchemy.exc import IntegrityError

from app.modules.mentorship.models import (
    WeeklyMentorshipSchedule,
    WeeklyMentorshipSession,
    MentorshipBooking,
    MentorshipAttendance,
)
from app.modules.mentorship.schemas import (
    WeeklyMentorshipScheduleCreate,
    WeeklyMentorshipScheduleUpdate,
    WeeklyMentorshipSessionCreate,
    MentorshipBookingCreate,
    MentorshipBookingAction,
    MentorshipAttendanceCreate,
    MentorshipAttendanceMark,
)
from app.modules.batches.models import Batch
from app.modules.users.models import TeacherProfile


class WeeklyMentorshipScheduleService:
    """Business logic for weekly mentorship schedules (Admin-managed)."""

    @staticmethod
    async def create_schedule(
        db: AsyncSession, data: WeeklyMentorshipScheduleCreate, created_by: UUID
    ) -> WeeklyMentorshipSchedule:
        """Admin creates a recurring weekly mentorship schedule for a batch."""
        # Verify batch exists
        batch = await db.execute(
            select(Batch).where(Batch.id == data.batch_id)
        )
        if batch.scalar_one_or_none() is None:
            raise ValueError("Batch not found")

        schedule = WeeklyMentorshipSchedule(
            batch_id=data.batch_id,
            day_of_week=data.day_of_week,
            start_time=data.start_time,
            duration_minutes=data.duration_minutes,
            is_active=data.is_active,
            created_by=created_by,
        )
        db.add(schedule)
        try:
            await db.commit()
            await db.refresh(schedule)
            return schedule
        except IntegrityError:
            await db.rollback()
            raise ValueError("Schedule could not be created")

    @staticmethod
    async def get_schedule(db: AsyncSession, schedule_id: UUID) -> WeeklyMentorshipSchedule | None:
        """Get a schedule by ID."""
        result = await db.execute(
            select(WeeklyMentorshipSchedule).where(WeeklyMentorshipSchedule.id == schedule_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_schedules(
        db: AsyncSession, batch_id: UUID | None = None, active_only: bool = False
    ) -> list[WeeklyMentorshipSchedule]:
        """List weekly mentorship schedules."""
        query = select(WeeklyMentorshipSchedule)
        if batch_id is not None:
            query = query.where(WeeklyMentorshipSchedule.batch_id == batch_id)
        if active_only:
            query = query.where(WeeklyMentorshipSchedule.is_active == True)  # noqa: E712
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def update_schedule(
        db: AsyncSession,
        schedule: WeeklyMentorshipSchedule,
        data: WeeklyMentorshipScheduleUpdate,
    ) -> WeeklyMentorshipSchedule:
        """Admin changes the weekly mentorship time."""
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(schedule, field, value)
        await db.commit()
        await db.refresh(schedule)
        return schedule

    @staticmethod
    async def delete_schedule(
        db: AsyncSession, schedule: WeeklyMentorshipSchedule
    ) -> None:
        """Admin deletes a weekly mentorship schedule."""
        await db.delete(schedule)
        await db.commit()


class WeeklyMentorshipSessionService:
    """Business logic for individual weekly session occurrences."""

    @staticmethod
    async def generate_sessions_from_schedule(
        db: AsyncSession,
        schedule: WeeklyMentorshipSchedule,
        start_date: date,
        end_date: date,
    ) -> list[WeeklyMentorshipSession]:
        """Generate individual session occurrences from a recurring schedule.

        Creates sessions for each occurrence of the day_of_week between
        start_date and end_date.
        """
        sessions: list[WeeklyMentorshipSession] = []

        # Find the first occurrence of day_of_week on or after start_date
        current = start_date
        while current.weekday() != schedule.day_of_week:
            current += timedelta(days=1)

        while current <= end_date:
            # Compute start and end datetime (UTC)
            start_dt = datetime(
                current.year, current.month, current.day,
                schedule.start_time.hour, schedule.start_time.minute,
                tzinfo=timezone.utc,
            )
            end_dt = start_dt + timedelta(minutes=schedule.duration_minutes)

            # Check if session already exists
            existing = await db.execute(
                select(WeeklyMentorshipSession).where(
                    WeeklyMentorshipSession.schedule_id == schedule.id,
                    WeeklyMentorshipSession.session_date == current,
                )
            )
            if existing.scalar_one_or_none() is None:
                session = WeeklyMentorshipSession(
                    schedule_id=schedule.id,
                    batch_id=schedule.batch_id,
                    session_date=current,
                    start_time=start_dt,
                    end_time=end_dt,
                    status="upcoming",
                )
                db.add(session)
                sessions.append(session)

            current += timedelta(days=7)

        if sessions:
            await db.commit()
            for s in sessions:
                await db.refresh(s)

        return sessions

    @staticmethod
    async def get_session(db: AsyncSession, session_id: UUID) -> WeeklyMentorshipSession | None:
        """Get a session by ID."""
        result = await db.execute(
            select(WeeklyMentorshipSession).where(WeeklyMentorshipSession.id == session_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_sessions(
        db: AsyncSession,
        batch_id: UUID | None = None,
        status: str | None = None,
    ) -> list[WeeklyMentorshipSession]:
        """List weekly mentorship sessions."""
        query = select(WeeklyMentorshipSession)
        if batch_id is not None:
            query = query.where(WeeklyMentorshipSession.batch_id == batch_id)
        if status is not None:
            query = query.where(WeeklyMentorshipSession.status == status)
        result = await db.execute(query.order_by(WeeklyMentorshipSession.session_date))
        return result.scalars().all()

    @staticmethod
    async def list_upcoming_sessions(
        db: AsyncSession, batch_id: UUID
    ) -> list[WeeklyMentorshipSession]:
        """List upcoming sessions for a batch (student/teacher view)."""
        today = date.today()
        result = await db.execute(
            select(WeeklyMentorshipSession).where(
                WeeklyMentorshipSession.batch_id == batch_id,
                WeeklyMentorshipSession.session_date >= today,
                WeeklyMentorshipSession.status == "upcoming",
            ).order_by(WeeklyMentorshipSession.session_date)
        )
        return result.scalars().all()


class MentorshipBookingService:
    """Business logic for one-to-one mentorship bookings."""

    @staticmethod
    async def create_booking(
        db: AsyncSession, data: MentorshipBookingCreate
    ) -> MentorshipBooking:
        """Student requests a one-to-one mentorship session with a teacher.

        Only teachers assigned to the student's relevant batch should be
        selectable (enforced at the API/authorization layer).
        """
        booking = MentorshipBooking(
            student_profile_id=data.student_profile_id,
            mentor_profile_id=data.mentor_profile_id,
            enrollment_id=data.enrollment_id,
            preferred_time=data.preferred_time,
            reason=data.reason,
            status="requested",
        )
        db.add(booking)
        try:
            await db.commit()
            await db.refresh(booking)
            return booking
        except IntegrityError:
            await db.rollback()
            raise ValueError("Booking could not be created")

    @staticmethod
    async def get_booking(db: AsyncSession, booking_id: UUID) -> MentorshipBooking | None:
        """Get a booking by ID."""
        result = await db.execute(
            select(MentorshipBooking).where(MentorshipBooking.id == booking_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_student_bookings(
        db: AsyncSession, student_profile_id: UUID
    ) -> list[MentorshipBooking]:
        """List one-to-one bookings for a student."""
        result = await db.execute(
            select(MentorshipBooking).where(
                MentorshipBooking.student_profile_id == student_profile_id
            ).order_by(MentorshipBooking.created_at.desc())
        )
        return result.scalars().all()

    @staticmethod
    async def list_mentor_bookings(
        db: AsyncSession, mentor_profile_id: UUID
    ) -> list[MentorshipBooking]:
        """List one-to-one bookings where a teacher is the mentor."""
        result = await db.execute(
            select(MentorshipBooking).where(
                MentorshipBooking.mentor_profile_id == mentor_profile_id
            ).order_by(MentorshipBooking.created_at.desc())
        )
        return result.scalars().all()

    @staticmethod
    async def list_all_bookings(db: AsyncSession) -> list[MentorshipBooking]:
        """Admin: view all bookings."""
        result = await db.execute(
            select(MentorshipBooking).order_by(MentorshipBooking.created_at.desc())
        )
        return result.scalars().all()

    @staticmethod
    async def approve_or_reject_booking(
        db: AsyncSession,
        booking_id: UUID,
        mentor_profile_id: UUID,
        action: MentorshipBookingAction,
    ) -> MentorshipBooking:
        """Teacher approves or rejects their own booking."""
        booking = await MentorshipBookingService.get_booking(db, booking_id)
        if booking is None:
            raise ValueError("Booking not found")

        # Only the mentor can approve/reject their own booking
        if booking.mentor_profile_id != mentor_profile_id:
            raise ValueError("Only the assigned mentor can approve or reject this booking")

        if booking.status != "requested":
            raise ValueError(f"Booking is already '{booking.status}', cannot modify")

        if action.status not in ("approved", "rejected"):
            raise ValueError("Action must be 'approved' or 'rejected'")

        booking.status = action.status
        if action.status == "approved":
            booking.confirmed_time = booking.preferred_time
        await db.commit()
        await db.refresh(booking)
        return booking

    @staticmethod
    async def cancel_booking(
        db: AsyncSession, booking_id: UUID, student_profile_id: UUID
    ) -> MentorshipBooking:
        """Student cancels their own booking."""
        booking = await MentorshipBookingService.get_booking(db, booking_id)
        if booking is None:
            raise ValueError("Booking not found")

        if booking.student_profile_id != student_profile_id:
            raise ValueError("Only the student can cancel this booking")

        if booking.status not in ("requested", "approved"):
            raise ValueError(f"Cannot cancel a '{booking.status}' booking")

        booking.status = "cancelled"
        await db.commit()
        await db.refresh(booking)
        return booking


class MentorshipAttendanceService:
    """Business logic for mentorship attendance."""

    @staticmethod
    async def mark_attendance(
        db: AsyncSession,
        marked_by: UUID,
        data: MentorshipAttendanceMark,
        weekly_session_id: UUID | None = None,
        booking_id: UUID | None = None,
    ) -> MentorshipAttendance:
        """Teacher or Admin marks attendance for a weekly session or one-to-one booking."""
        # Validate status
        if data.status not in ("present", "absent", "excused"):
            raise ValueError("Status must be 'present', 'absent', or 'excused'")

        # Verify either weekly_session_id or booking_id is set (not both)
        if weekly_session_id is None and booking_id is None:
            raise ValueError("Either weekly_session_id or booking_id must be provided")
        if weekly_session_id is not None and booking_id is not None:
            raise ValueError("Provide either weekly_session_id or booking_id, not both")

        # Verify the referenced entity exists
        if weekly_session_id is not None:
            session = await WeeklyMentorshipSessionService.get_session(db, weekly_session_id)
            if session is None:
                raise ValueError("Weekly session not found")
        else:
            booking = await MentorshipBookingService.get_booking(db, booking_id)
            if booking is None:
                raise ValueError("Booking not found")

        # Check if attendance already marked
        existing = await db.execute(
            select(MentorshipAttendance).where(
                MentorshipAttendance.student_profile_id == UUID(data.student_profile_id),
                MentorshipAttendance.weekly_session_id == weekly_session_id,
                MentorshipAttendance.booking_id == booking_id,
            )
        )
        if existing.scalar_one_or_none():
            raise ValueError("Attendance already marked for this session/booking")

        attendance = MentorshipAttendance(
            weekly_session_id=weekly_session_id,
            booking_id=booking_id,
            student_profile_id=UUID(data.student_profile_id),
            marked_by=marked_by,
            status=data.status,
        )
        db.add(attendance)
        try:
            await db.commit()
            await db.refresh(attendance)
            return attendance
        except IntegrityError:
            await db.rollback()
            raise ValueError("Attendance could not be recorded")

    @staticmethod
    async def list_attendance(
        db: AsyncSession,
        weekly_session_id: UUID | None = None,
        booking_id: UUID | None = None,
        student_profile_id: UUID | None = None,
    ) -> list[MentorshipAttendance]:
        """List attendance records."""
        query = select(MentorshipAttendance)
        if weekly_session_id is not None:
            query = query.where(MentorshipAttendance.weekly_session_id == weekly_session_id)
        if booking_id is not None:
            query = query.where(MentorshipAttendance.booking_id == booking_id)
        if student_profile_id is not None:
            query = query.where(MentorshipAttendance.student_profile_id == student_profile_id)
        result = await db.execute(query.order_by(MentorshipAttendance.marked_at.desc()))
        return result.scalars().all()

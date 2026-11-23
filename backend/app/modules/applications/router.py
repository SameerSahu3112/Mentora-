"""Application and intro-session routes.

Phase 4: Applications and introductory calls
- Student: POST /student/applications, GET /student/applications, GET /student/applications/{id}
- Student: GET /student/intro-sessions/{id}
- Admin: GET /admin/applications, GET /admin/applications/{id}, PATCH /admin/applications/{id}
- Admin: GET /admin/intro-sessions, PUT /admin/intro-sessions/{id}/schedule, PUT /admin/intro-sessions/{id}/complete
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.permissions import require_admin, require_student
from app.modules.auth.models import User
from app.modules.applications.models import BatchApplication, IntroSession
from app.modules.applications.schemas import (
    BatchApplicationCreate,
    BatchApplicationResponse,
    BatchApplicationWithIntro,
    IntroSessionResponse,
    IntroSessionScheduleRequest,
    IntroSessionCompleteRequest,
    ApplicationStatusResponse,
)
from app.modules.applications.service import ApplicationService, IntroSessionService
from app.modules.users.models import StudentProfile

router = APIRouter(prefix="/applications", tags=["applications"])


# ---------------------------------------------------------------------------
# Student routes
# ---------------------------------------------------------------------------

@router.post(
    "/student/applications",
    response_model=BatchApplicationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def student_create_application(
    data: BatchApplicationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_student),
):
    """Student applies to a batch (select course → batch).

    Phase 4: The selected batch is preserved through login/signup by the
    frontend storing it temporarily and sending course_id + batch_id here
    after authentication.
    """
    if current_user.student_profile is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student profile required",
        )
    try:
        return await ApplicationService.create_application(
            db, current_user.student_profile.id, current_user.id, data
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc)) from exc


@router.get("/student/applications", response_model=list[ApplicationStatusResponse])
async def student_list_applications(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_student),
):
    """List the current student's applications."""
    if current_user.student_profile is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student profile required",
        )
    return await ApplicationService.get_student_applications(
        db, current_user.student_profile.id
    )


@router.get(
    "/student/applications/{application_id}",
    response_model=BatchApplicationWithIntro,
)
async def student_get_application(
    application_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_student),
):
    """Get a single application with intro-session details."""
    if current_user.student_profile is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student profile required",
        )
    application = await ApplicationService.get_application(db, application_id)
    if (
        application is None
        or application.student_profile_id != current_user.student_profile.id
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )
    intro_session = await IntroSessionService.get_intro_session_by_application(
        db, application.id
    )
    return {
        "id": application.id,
        "student_profile_id": application.student_profile_id,
        "course_id": application.course_id,
        "batch_id": application.batch_id,
        "status": application.status,
        "applied_at": application.applied_at,
        "updated_at": application.updated_at,
        "intro_session": (
            IntroSessionResponse.model_validate(intro_session).model_dump(mode="json")
            if intro_session
            else None
        ),
    }


@router.get(
    "/student/intro-sessions/{session_id}",
    response_model=IntroSessionResponse,
)
async def student_get_intro_session(
    session_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_student),
):
    """Get intro-call status, scheduled time, and outcome."""
    if current_user.student_profile is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student profile required",
        )
    session = await IntroSessionService.get_intro_session(db, session_id)
    if (
        session is None
        or session.application.student_profile_id != current_user.student_profile.id
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Intro session not found",
        )
    return session


# ---------------------------------------------------------------------------
# Admin routes
# ---------------------------------------------------------------------------

@router.get("/admin/applications", response_model=list[BatchApplicationResponse])
async def admin_list_applications(
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: list all applications."""
    return await ApplicationService.list_all_applications(db)


@router.get(
    "/admin/applications/{application_id}",
    response_model=ApplicationStatusResponse,
)
async def admin_get_application(
    application_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: get application detail with intro session."""
    app_with_intro = await ApplicationService.get_application_with_intro(
        db, application_id
    )
    if app_with_intro is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    return app_with_intro


@router.patch("/admin/applications/{application_id}", response_model=BatchApplicationResponse)
async def admin_update_application(
    application_id: UUID,
    application_status: str = Query(..., alias="status", description="approved, rejected, or cancelled"),
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: approve or reject an application.

    Rejecting is a critical action requiring two-Admin approval (Phase 8).
    Releasing a reserved seat happens on rejection/cancellation.
    """
    application = await ApplicationService.get_application(db, application_id)
    if application is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")

    allowed = {"approved", "rejected", "cancelled"}
    if application_status not in allowed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Status must be one of {allowed}",
        )

    application.status = application_status
    await db.commit()
    await db.refresh(application)

    # Release seat on rejection/cancellation
    if application_status in ("rejected", "cancelled"):
        from app.modules.batches.service import BatchService
        await BatchService.release_seat(db, application.batch_id)

    return application


@router.get("/admin/intro-sessions", response_model=list[IntroSessionResponse])
async def admin_list_intro_sessions(
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: list all intro sessions."""
    return await IntroSessionService.list_all_intro_sessions(db)


@router.get("/admin/intro-sessions/due", response_model=list[IntroSessionResponse])
async def admin_list_due_intro_sessions(
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: list intro calls due within the 7-day deadline."""
    return await IntroSessionService.list_due_calls(db)


@router.put(
    "/admin/intro-sessions/{session_id}/schedule",
    response_model=IntroSessionResponse,
)
async def admin_schedule_intro_call(
    session_id: UUID,
    data: IntroSessionScheduleRequest,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: schedule or reschedule an introductory call."""
    try:
        session = await IntroSessionService.schedule_or_reschedule(
            db, session_id, data.scheduled_at, data.outcome_notes
        )
        return session
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))


@router.put(
    "/admin/intro-sessions/{session_id}/complete",
    response_model=IntroSessionResponse,
)
async def admin_complete_intro_call(
    session_id: UUID,
    data: IntroSessionCompleteRequest,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: mark an intro call as completed."""
    try:
        session = await IntroSessionService.complete_call(
            db, session_id, data.outcome_notes, data.follow_up_required
        )
        return session
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))


@router.put(
    "/admin/intro-sessions/{session_id}/missed",
    response_model=IntroSessionResponse,
)
async def admin_mark_intro_call_missed(
    session_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: mark an intro call as missed (student unavailable)."""
    try:
        session = await IntroSessionService.mark_missed(db, session_id)
        return session
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))

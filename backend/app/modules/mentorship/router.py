"""Mentorship and attendance routes.

Phase 7: Mentorship and attendance
- Weekly schedules: GET/POST /mentorship/weekly-schedules, PUT/DELETE /mentorship/weekly-schedules/{id}
- Weekly sessions: GET /mentorship/sessions, GET /mentorship/sessions/upcoming/{batch_id}
- One-to-one bookings: POST /mentorship/bookings, GET /mentorship/bookings, PUT /mentorship/bookings/{id}/approve-or-reject
- Attendance: POST /mentorship/attendance, GET /mentorship/attendance
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import date

from app.core.database import get_db
from app.modules.mentorship.models import (
    WeeklyMentorshipSchedule,
    WeeklyMentorshipSession,
    MentorshipBooking,
    MentorshipAttendance,
)
from app.modules.mentorship.schemas import (
    WeeklyMentorshipScheduleCreate,
    WeeklyMentorshipScheduleUpdate,
    WeeklyMentorshipScheduleResponse,
    WeeklyMentorshipSessionCreate,
    WeeklyMentorshipSessionResponse,
    MentorshipBookingCreate,
    MentorshipBookingResponse,
    MentorshipBookingAction,
    MentorshipAttendanceCreate,
    MentorshipAttendanceResponse,
    MentorshipAttendanceMark,
)
from app.modules.mentorship.service import (
    WeeklyMentorshipScheduleService,
    WeeklyMentorshipSessionService,
    MentorshipBookingService,
    MentorshipAttendanceService,
)

router = APIRouter(prefix="/mentorship", tags=["mentorship"])


# ------------------------------------------------------------------
# Weekly Mentorship Schedules (Admin-managed)
# ------------------------------------------------------------------

@router.post(
    "/weekly-schedules",
    response_model=WeeklyMentorshipScheduleResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_weekly_schedule(
    data: WeeklyMentorshipScheduleCreate,
    db: AsyncSession = Depends(get_db),
):
    """Admin creates a recurring weekly mentorship schedule for a batch."""
    # Phase 7: created_by comes from session/auth middleware.
    # Placeholder: using a system UUID until auth middleware is wired.
    created_by = UUID("00000000-0000-0000-0000-000000000001")
    try:
        schedule = await WeeklyMentorshipScheduleService.create_schedule(
            db, data, created_by
        )
        return schedule
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.get("/weekly-schedules", response_model=list[WeeklyMentorshipScheduleResponse])
async def list_weekly_schedules(
    batch_id: UUID | None = Query(None),
    active_only: bool = Query(True),
    db: AsyncSession = Depends(get_db),
):
    """List weekly mentorship schedules."""
    return await WeeklyMentorshipScheduleService.list_schedules(
        db, batch_id=batch_id, active_only=active_only
    )


@router.get("/weekly-schedules/{schedule_id}", response_model=WeeklyMentorshipScheduleResponse)
async def get_weekly_schedule(
    schedule_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a weekly mentorship schedule by ID."""
    schedule = await WeeklyMentorshipScheduleService.get_schedule(db, schedule_id)
    if schedule is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Schedule not found")
    return schedule


@router.put("/weekly-schedules/{schedule_id}", response_model=WeeklyMentorshipScheduleResponse)
async def update_weekly_schedule(
    schedule_id: UUID,
    data: WeeklyMentorshipScheduleUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Admin changes the weekly mentorship time."""
    schedule = await WeeklyMentorshipScheduleService.get_schedule(db, schedule_id)
    if schedule is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Schedule not found")
    try:
        return await WeeklyMentorshipScheduleService.update_schedule(db, schedule, data)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.delete("/weekly-schedules/{schedule_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_weekly_schedule(
    schedule_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Admin deletes a weekly mentorship schedule."""
    schedule = await WeeklyMentorshipScheduleService.get_schedule(db, schedule_id)
    if schedule is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Schedule not found")
    await WeeklyMentorshipScheduleService.delete_schedule(db, schedule)


# ------------------------------------------------------------------
# Weekly Mentorship Sessions
# ------------------------------------------------------------------

@router.post(
    "/sessions",
    response_model=list[WeeklyMentorshipSessionResponse],
    status_code=status.HTTP_201_CREATED,
)
async def generate_sessions(
    schedule_id: UUID,
    start_date: date,
    end_date: date,
    db: AsyncSession = Depends(get_db),
):
    """Admin generates individual session occurrences from a recurring schedule."""
    schedule = await WeeklyMentorshipScheduleService.get_schedule(db, schedule_id)
    if schedule is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Schedule not found")
    sessions = await WeeklyMentorshipSessionService.generate_sessions_from_schedule(
        db, schedule, start_date, end_date
    )
    return sessions


@router.get("/sessions", response_model=list[WeeklyMentorshipSessionResponse])
async def list_sessions(
    batch_id: UUID | None = Query(None),
    status: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """List weekly mentorship sessions."""
    return await WeeklyMentorshipSessionService.list_sessions(
        db, batch_id=batch_id, status=status
    )


@router.get("/sessions/upcoming/{batch_id}", response_model=list[WeeklyMentorshipSessionResponse])
async def list_upcoming_sessions(
    batch_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """List upcoming sessions for a batch (student/teacher view)."""
    return await WeeklyMentorshipSessionService.list_upcoming_sessions(db, batch_id)


@router.get("/sessions/{session_id}", response_model=WeeklyMentorshipSessionResponse)
async def get_session(
    session_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a weekly mentorship session by ID."""
    session = await WeeklyMentorshipSessionService.get_session(db, session_id)
    if session is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    return session


# ------------------------------------------------------------------
# One-to-One Mentorship Bookings
# ------------------------------------------------------------------

@router.post(
    "/bookings",
    response_model=MentorshipBookingResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_booking(
    data: MentorshipBookingCreate,
    db: AsyncSession = Depends(get_db),
):
    """Student requests a one-to-one mentorship session with a teacher."""
    try:
        booking = await MentorshipBookingService.create_booking(db, data)
        return booking
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.get("/bookings", response_model=list[MentorshipBookingResponse])
async def list_bookings(
    student_profile_id: UUID | None = Query(None),
    mentor_profile_id: UUID | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """List one-to-one bookings.

    - If student_profile_id: list student's bookings
    - If mentor_profile_id: list mentor's bookings
    - Otherwise: Admin views all bookings
    """
    if student_profile_id is not None:
        return await MentorshipBookingService.list_student_bookings(db, student_profile_id)
    if mentor_profile_id is not None:
        return await MentorshipBookingService.list_mentor_bookings(db, mentor_profile_id)
    return await MentorshipBookingService.list_all_bookings(db)


@router.get("/bookings/{booking_id}", response_model=MentorshipBookingResponse)
async def get_booking(
    booking_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a one-to-one booking by ID."""
    booking = await MentorshipBookingService.get_booking(db, booking_id)
    if booking is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
    return booking


@router.put(
    "/bookings/{booking_id}/approve-or-reject",
    response_model=MentorshipBookingResponse,
)
async def approve_or_reject_booking(
    booking_id: UUID,
    data: MentorshipBookingAction,
    db: AsyncSession = Depends(get_db),
):
    """Teacher approves or rejects their own one-to-one booking."""
    # Phase 7: mentor_profile_id comes from session/auth middleware.
    # Placeholder: using a system UUID until auth middleware is wired.
    mentor_profile_id = UUID("00000000-0000-0000-0000-000000000001")
    try:
        booking = await MentorshipBookingService.approve_or_reject_booking(
            db, booking_id, mentor_profile_id, data
        )
        return booking
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.delete("/bookings/{booking_id}", status_code=status.HTTP_204_NO_CONTENT)
async def cancel_booking(
    booking_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Student cancels their own one-to-one booking."""
    # Phase 7: student_profile_id comes from session/auth middleware.
    # Placeholder: using a system UUID until auth middleware is wired.
    student_profile_id = UUID("00000000-0000-0000-0000-000000000001")
    try:
        booking = await MentorshipBookingService.cancel_booking(
            db, booking_id, student_profile_id
        )
        return booking
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


# ------------------------------------------------------------------
# Mentorship Attendance
# ------------------------------------------------------------------

@router.post(
    "/attendance",
    response_model=MentorshipAttendanceResponse,
    status_code=status.HTTP_201_CREATED,
)
async def mark_attendance(
    weekly_session_id: UUID | None = Query(None),
    booking_id: UUID | None = Query(None),
    data: MentorshipAttendanceMark = None,
    db: AsyncSession = Depends(get_db),
):
    """Teacher or Admin marks attendance for a weekly session or one-to-one booking."""
    # Phase 7: marked_by comes from session/auth middleware.
    # Placeholder: using a system UUID until auth middleware is wired.
    marked_by = UUID("00000000-0000-0000-0000-000000000001")
    if data is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Attendance data required")
    try:
        attendance = await MentorshipAttendanceService.mark_attendance(
            db, marked_by, data, weekly_session_id=weekly_session_id, booking_id=booking_id
        )
        return attendance
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.get("/attendance", response_model=list[MentorshipAttendanceResponse])
async def list_attendance(
    weekly_session_id: UUID | None = Query(None),
    booking_id: UUID | None = Query(None),
    student_profile_id: UUID | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """List attendance records."""
    return await MentorshipAttendanceService.list_attendance(
        db,
        weekly_session_id=weekly_session_id,
        booking_id=booking_id,
        student_profile_id=student_profile_id,
    )

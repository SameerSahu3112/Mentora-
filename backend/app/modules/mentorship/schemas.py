"""Mentorship domain Pydantic schemas.

Phase 7: Mentorship and attendance
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime, time


# ------------------------------------------------------------
# Weekly Mentorship Schedule
# ------------------------------------------------------------

class WeeklyMentorshipScheduleBase(BaseModel):
    batch_id: str
    day_of_week: int = Field(..., ge=0, le=6)  # 0=Monday, 6=Sunday
    start_time: time
    duration_minutes: int = Field(60, gt=0)
    is_active: bool = True


class WeeklyMentorshipScheduleCreate(WeeklyMentorshipScheduleBase):
    pass


class WeeklyMentorshipScheduleUpdate(BaseModel):
    day_of_week: Optional[int] = Field(None, ge=0, le=6)
    start_time: Optional[time] = None
    duration_minutes: Optional[int] = Field(None, gt=0)
    is_active: Optional[bool] = None


class WeeklyMentorshipScheduleResponse(WeeklyMentorshipScheduleBase):
    id: str
    created_by: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ------------------------------------------------------------
# Weekly Mentorship Session
# ------------------------------------------------------------

class WeeklyMentorshipSessionBase(BaseModel):
    schedule_id: str
    batch_id: str
    session_date: date
    start_time: datetime
    end_time: datetime
    status: str = "upcoming"


class WeeklyMentorshipSessionCreate(WeeklyMentorshipSessionBase):
    pass


class WeeklyMentorshipSessionResponse(WeeklyMentorshipSessionBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True


# ------------------------------------------------------------
# Mentorship Booking (One-to-One)
# ------------------------------------------------------------

class MentorshipBookingBase(BaseModel):
    student_profile_id: str
    mentor_profile_id: str
    enrollment_id: str
    preferred_time: datetime
    reason: Optional[str] = None


class MentorshipBookingCreate(MentorshipBookingBase):
    pass


class MentorshipBookingUpdate(BaseModel):
    preferred_time: Optional[datetime] = None
    reason: Optional[str] = None


class MentorshipBookingResponse(MentorshipBookingBase):
    id: str
    confirmed_time: Optional[datetime] = None
    status: str
    attended: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MentorshipBookingAction(BaseModel):
    """Teacher approves or rejects their own booking."""

    status: str = Field(..., description="approved or rejected")


# ------------------------------------------------------------
# Mentorship Attendance
# ------------------------------------------------------------

class MentorshipAttendanceBase(BaseModel):
    student_profile_id: str
    status: str = "present"


class MentorshipAttendanceCreate(MentorshipAttendanceBase):
    weekly_session_id: Optional[str] = None
    booking_id: Optional[str] = None


class MentorshipAttendanceResponse(MentorshipAttendanceBase):
    id: str
    weekly_session_id: Optional[str] = None
    booking_id: Optional[str] = None
    marked_by: str
    marked_at: datetime

    class Config:
        from_attributes = True


class MentorshipAttendanceMark(BaseModel):
    """Teacher or Admin marks attendance."""

    status: str = Field(..., description="present, absent, or excused")

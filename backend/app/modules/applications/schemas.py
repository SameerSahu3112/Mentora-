"""Application domain Pydantic schemas.

Phase 4: Applications and introductory calls
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class BatchApplicationCreate(BaseModel):
    """Student applies to a batch."""

    course_id: str
    batch_id: str


class BatchApplicationResponse(BaseModel):
    """Application response with intro-session info."""

    id: str
    student_profile_id: str
    course_id: str
    batch_id: str
    status: str
    applied_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BatchApplicationWithIntro(BatchApplicationResponse):
    """Application including intro session details."""

    intro_session: Optional[dict] = None


class IntroSessionResponse(BaseModel):
    """Introductory session response."""

    id: str
    application_id: str
    status: str
    scheduled_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    outcome_notes: Optional[str] = None
    follow_up_required: bool
    deadline_at: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class IntroSessionScheduleRequest(BaseModel):
    """Admin schedules or reschedules an intro call."""

    scheduled_at: datetime
    outcome_notes: Optional[str] = None


class IntroSessionCompleteRequest(BaseModel):
    """Admin marks an intro call as completed."""

    outcome_notes: Optional[str] = None
    follow_up_required: bool = False


class ApplicationStatusResponse(BaseModel):
    """Student-facing application + intro-call status."""

    application_id: str
    course_id: str
    batch_id: str
    batch_name: Optional[str] = None
    application_status: str
    applied_at: datetime
    intro_session_status: Optional[str] = None
    intro_scheduled_at: Optional[datetime] = None
    intro_deadline_at: Optional[datetime] = None
    confirmation_message: Optional[str] = None

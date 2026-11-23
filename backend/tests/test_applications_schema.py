"""Phase 4: Application and intro session schema validation tests."""

from datetime import datetime
from uuid import uuid4
from app.modules.applications.schemas import (
    BatchApplicationCreate,
    IntroSessionScheduleRequest,
    IntroSessionCompleteRequest,
    ApplicationStatusResponse,
)
from app.modules.notifications.schemas import NotificationCreate, NotificationResponse


def test_batch_application_create_valid():
    """Valid application create schema should parse."""
    course_id = uuid4()
    batch_id = uuid4()
    data = BatchApplicationCreate(course_id=course_id, batch_id=batch_id)
    assert data.course_id == course_id
    assert data.batch_id == batch_id


def test_intro_session_schedule_request_valid():
    """Valid schedule request should parse."""
    data = IntroSessionScheduleRequest(
        scheduled_at=datetime(2026, 12, 1, 10, 0, 0),
        outcome_notes=None,
    )
    assert data.scheduled_at == datetime(2026, 12, 1, 10, 0, 0)


def test_intro_session_complete_request_valid():
    """Valid complete request should parse."""
    data = IntroSessionCompleteRequest(
        outcome_notes="Call completed successfully",
        follow_up_required=False,
    )
    assert data.outcome_notes == "Call completed successfully"
    assert data.follow_up_required is False


def test_notification_create_valid():
    """Valid notification create should parse."""
    data = NotificationCreate(
        recipient_user_id="u1",
        type="registration",
        title="Welcome",
        message="Thank you for registering",
    )
    assert data.type == "registration"
    assert data.title == "Welcome"


def test_application_status_response():
    """Application status response should have all required fields."""
    application_id = uuid4()
    course_id = uuid4()
    batch_id = uuid4()
    data = ApplicationStatusResponse(
        application_id=application_id,
        course_id=course_id,
        batch_id=batch_id,
        application_status="pending",
        applied_at=datetime(2026, 11, 19, 10, 0, 0),
        intro_session_status="pending",
        confirmation_message="Thank you for registering with Mentora!",
    )
    assert data.application_id == application_id
    assert data.application_status == "pending"
    assert data.intro_session_status == "pending"
    assert "Mentora" in data.confirmation_message

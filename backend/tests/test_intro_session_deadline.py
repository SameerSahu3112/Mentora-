"""Phase 4: Intro session 7-day deadline tests."""

from datetime import datetime, timedelta, timezone
from app.modules.applications.models import IntroSession


def test_default_deadline_is_seven_days():
    """Intro session default deadline should be registration + 7 days."""
    deadline = IntroSession.default_deadline()
    now = datetime.now(timezone.utc)
    expected = now + timedelta(days=7)
    # Allow 1 second tolerance
    assert abs((deadline - expected).total_seconds()) < 2


def test_deadline_is_in_utc():
    """Deadline should be timezone-aware UTC."""
    deadline = IntroSession.default_deadline()
    assert deadline.tzinfo is not None
    assert deadline.tzinfo == timezone.utc

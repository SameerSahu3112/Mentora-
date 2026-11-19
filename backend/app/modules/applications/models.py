"""Application domain models.

Phase 4: Applications and introductory calls
- batch_applications: student application to a batch (separate from enrollment)
- intro_sessions: auto-created introductory phone-call record per application
"""

import uuid
from datetime import datetime, timedelta, timezone
from sqlalchemy import (
    Column, String, DateTime, ForeignKey, CheckConstraint, Boolean,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class BatchApplication(Base):
    """Student application to a batch. Separate from enrollment."""

    __tablename__ = "batch_applications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("student_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    course_id = Column(
        UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False
    )
    batch_id = Column(
        UUID(as_uuid=True), ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    status = Column(String(32), nullable=False, default="pending")
    applied_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    student_profile = relationship("StudentProfile", backref="applications")
    course = relationship("Course", backref="applications")
    batch = relationship("Batch", backref="applications")
    intro_session = relationship("IntroSession", back_populates="application", uselist=False, cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending', 'approved', 'rejected', 'cancelled')",
            name="chk_batch_applications_status",
        ),
    )


class IntroSession(Base):
    """Introductory phone-call record, auto-created per application."""

    __tablename__ = "intro_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(
        UUID(as_uuid=True),
        ForeignKey("batch_applications.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    status = Column(String(32), nullable=False, default="pending")
    scheduled_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    outcome_notes = Column(String(1000), nullable=True)
    follow_up_required = Column(Boolean, nullable=False, default=False)
    # Seven-day follow-up deadline from registration
    deadline_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    application = relationship("BatchApplication", back_populates="intro_session")

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending', 'scheduled', 'reschedule_requested', 'completed', 'missed', 'cancelled')",
            name="chk_intro_sessions_status",
        ),
    )

    @staticmethod
    def default_deadline() -> datetime:
        """Registration + 7 days, in UTC."""
        return datetime.now(timezone.utc) + timedelta(days=7)

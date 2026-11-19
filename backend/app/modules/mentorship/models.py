"""Mentorship domain models.

Phase 7: Mentorship and attendance
- weekly_mentorship_schedules: Recurring weekly group session per batch (Admin-managed)
- weekly_mentorship_sessions: Individual session occurrences generated from schedules
- mentorship_bookings: One-to-one mentorship booking (student selects teacher, teacher/Admin approves)
"""

import uuid
from sqlalchemy import (
    Column, String, DateTime, ForeignKey, CheckConstraint,
    UniqueConstraint, Integer, Time, Boolean, Date,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class WeeklyMentorshipSchedule(Base):
    """Recurring weekly group mentorship schedule per batch."""

    __tablename__ = "weekly_mentorship_schedules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    batch_id = Column(
        UUID(as_uuid=True), ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    day_of_week = Column(Integer, nullable=False)  # 0=Monday, 6=Sunday
    start_time = Column(Time, nullable=False)
    duration_minutes = Column(Integer, nullable=False, default=60)
    is_active = Column(Boolean, nullable=False, default=True)
    created_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=False
    )
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    batch = relationship("Batch", backref="mentorship_schedules")

    __table_args__ = (
        CheckConstraint(
            "day_of_week BETWEEN 0 AND 6",
            name="chk_weekly_mentorship_schedules_day_of_week",
        ),
        CheckConstraint(
            "duration_minutes > 0",
            name="chk_weekly_mentorship_schedules_duration",
        ),
    )


class WeeklyMentorshipSession(Base):
    """Individual weekly mentorship session occurrence generated from a schedule."""

    __tablename__ = "weekly_mentorship_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    schedule_id = Column(
        UUID(as_uuid=True),
        ForeignKey("weekly_mentorship_schedules.id", ondelete="CASCADE"),
        nullable=False,
    )
    batch_id = Column(
        UUID(as_uuid=True), ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    session_date = Column(Date, nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=False)
    status = Column(String(32), nullable=False, default="upcoming")
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    schedule = relationship("WeeklyMentorshipSchedule", backref="sessions")
    batch = relationship("Batch", backref="mentorship_sessions")
    attendance = relationship("MentorshipAttendance", back_populates="weekly_session", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint(
            "status IN ('upcoming', 'completed', 'cancelled')",
            name="chk_weekly_mentorship_sessions_status",
        ),
    )


class MentorshipBooking(Base):
    """One-to-one mentorship booking.

    Student selects a preferred teacher (assigned to their batch).
    Teacher approves/rejects their own booking. Admin can view/manage all.
    """

    __tablename__ = "mentorship_bookings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("student_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    mentor_profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("teacher_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    enrollment_id = Column(
        UUID(as_uuid=True), ForeignKey("enrollments.id", ondelete="CASCADE"), nullable=False
    )
    preferred_time = Column(DateTime(timezone=True), nullable=False)
    confirmed_time = Column(DateTime(timezone=True), nullable=True)
    status = Column(String(32), nullable=False, default="requested")
    reason = Column(String(1000), nullable=True)
    attended = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    student_profile = relationship("StudentProfile", backref="mentorship_bookings")
    mentor_profile = relationship("TeacherProfile", backref="mentorship_bookings_as_mentor")
    enrollment = relationship("Enrollment", backref="mentorship_bookings")
    attendance = relationship("MentorshipAttendance", back_populates="booking", cascade="all, delete-orphan", uselist=False)

    __table_args__ = (
        CheckConstraint(
            "status IN ('requested', 'approved', 'rejected', 'cancelled', 'completed')",
            name="chk_mentorship_bookings_status",
        ),
    )


class MentorshipAttendance(Base):
    """Attendance for weekly sessions and one-to-one bookings."""

    __tablename__ = "mentorship_attendance"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    weekly_session_id = Column(
        UUID(as_uuid=True),
        ForeignKey("weekly_mentorship_sessions.id", ondelete="CASCADE"),
        nullable=True,
    )
    booking_id = Column(
        UUID(as_uuid=True),
        ForeignKey("mentorship_bookings.id", ondelete="CASCADE"),
        nullable=True,
    )
    student_profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("student_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    marked_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=False
    )
    status = Column(String(32), nullable=False, default="present")
    marked_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    weekly_session = relationship("WeeklyMentorshipSession", back_populates="attendance")
    booking = relationship("MentorshipBooking", back_populates="attendance")
    student_profile = relationship("StudentProfile", backref="mentorship_attendance")

    __table_args__ = (
        CheckConstraint(
            "status IN ('present', 'absent', 'excused')",
            name="chk_mentorship_attendance_status",
        ),
        # Either weekly_session_id or booking_id must be set, but not both
        CheckConstraint(
            "(weekly_session_id IS NOT NULL) XOR (booking_id IS NOT NULL)",
            name="chk_mentorship_attendance_either_session_or_booking",
        ),
    )

"""Batch domain models.

Phase 3: Courses, batches, teacher assignment
- batches: belongs to exactly one course, has capacity, dates, schedule, status
- batch_teachers: many-to-many join table batch <-> teacher
"""

import uuid
from sqlalchemy import (
    Column, String, Date, Integer, Boolean, DateTime, ForeignKey, CheckConstraint,
    UniqueConstraint, Text,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Batch(Base):
    """A batch belongs to exactly one course."""

    __tablename__ = "batches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(
        UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False
    )
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    weekly_schedule = Column(JSONB, nullable=True)
    max_capacity = Column(Integer, nullable=False, default=50)
    status = Column(String(32), nullable=False, default="active")
    is_droppers_batch = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    course = relationship("Course", back_populates="batches")
    teachers = relationship("BatchTeacher", back_populates="batch", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint("max_capacity > 0", name="chk_batches_max_capacity_positive"),
        CheckConstraint(
            "status IN ('active', 'full', 'closed', 'archived')",
            name="chk_batches_status",
        ),
    )


class BatchTeacher(Base):
    """Many-to-many join table: batch <-> teacher."""

    __tablename__ = "batch_teachers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    batch_id = Column(
        UUID(as_uuid=True), ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    teacher_profile_id = Column(
        UUID(as_uuid=True), ForeignKey("teacher_profiles.id", ondelete="CASCADE"), nullable=False
    )
    assigned_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    assigned_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )

    batch = relationship("Batch", back_populates="teachers")

    __table_args__ = (
        UniqueConstraint("batch_id", "teacher_profile_id", name="uq_batch_teachers_batch_teacher"),
    )

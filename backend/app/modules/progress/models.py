"""Progress domain models.

Phase 6: Resources and learning progress
- bookmarks: Student bookmarks a resource
- lesson_completions: Student manually marks a lesson/resource complete
"""

import uuid
from sqlalchemy import (
    Column, String, DateTime, ForeignKey, CheckConstraint,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Bookmark(Base):
    """Student bookmarks a resource (many-to-many student <-> resource)."""

    __tablename__ = "bookmarks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("student_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    resource_id = Column(
        UUID(as_uuid=True), ForeignKey("resources.id", ondelete="CASCADE"), nullable=False
    )
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    student_profile = relationship("StudentProfile", backref="bookmarks")
    resource = relationship("Resource", back_populates="bookmarks")

    __table_args__ = (
        UniqueConstraint(
            "student_profile_id", "resource_id", name="uq_bookmarks_student_resource"
        ),
    )


class LessonCompletion(Base):
    """Student manually marks a lesson/resource complete.

    Opening a resource does NOT automatically mark it complete — requires
    explicit student action.
    """

    __tablename__ = "lesson_completions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("student_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    resource_id = Column(
        UUID(as_uuid=True), ForeignKey("resources.id", ondelete="CASCADE"), nullable=False
    )
    completed_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    student_profile = relationship("StudentProfile", backref="completions")
    resource = relationship("Resource", back_populates="completions")

    __table_args__ = (
        UniqueConstraint(
            "student_profile_id", "resource_id", name="uq_lesson_completions_student_resource"
        ),
    )

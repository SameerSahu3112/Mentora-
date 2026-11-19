"""User profile models.

Phase 2: Identity and Access Control
- student_profiles: student-specific details with unique Student ID
- teacher_profiles: teacher-specific details (phone not shown to students)
"""

import uuid
from sqlalchemy import (
    Column, String, Boolean, DateTime, ForeignKey, CheckConstraint, UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class StudentProfile(Base):
    """Student profile linked to a user account."""

    __tablename__ = "student_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    student_id = Column(String(32), nullable=False, unique=True, index=True)
    full_name = Column(String(255), nullable=False)
    class_level = Column(String(4), nullable=False)  # 9, 10, 11, or 12
    email = Column(String(255), nullable=False)
    phone = Column(String(32), nullable=False)  # Not unique; families may share
    school_name = Column(String(255), nullable=True)
    coaching_institute_name = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="student_profile")

    __table_args__ = (
        CheckConstraint(class_level.in_(["9", "10", "11", "12"]), name="chk_student_profiles_class_level"),
    )


class TeacherProfile(Base):
    """Teacher profile linked to a user account."""

    __tablename__ = "teacher_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(32), nullable=True)  # Not shown to students
    bio = Column(String(1000), nullable=True)
    is_public = Column(Boolean, nullable=False, default=False)  # Consent-based public visibility
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="teacher_profile")

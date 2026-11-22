"""Resource domain models.

Phase 6: Resources and learning progress
- modules: Course contains modules
- chapters: Module contains chapters
- resources: Chapter contains resources (PDF, image, assignment, external links, text)
- resource_deletion_requests: Teacher requests deletion, Admin approves
"""

import uuid
from sqlalchemy import (
    Column, String, DateTime, ForeignKey, CheckConstraint,
    UniqueConstraint, Text, Boolean, Integer,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Module(Base):
    """A course contains modules."""

    __tablename__ = "modules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(
        UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    course = relationship("Course", back_populates="modules")
    chapters = relationship("Chapter", back_populates="module", cascade="all, delete-orphan")


class Chapter(Base):
    """A module contains chapters."""

    __tablename__ = "chapters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    module_id = Column(
        UUID(as_uuid=True), ForeignKey("modules.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    module = relationship("Module", back_populates="chapters")
    resources = relationship("Resource", back_populates="chapter", cascade="all, delete-orphan")


class Resource(Base):
    """A chapter contains resources.

    Resources belong to a course and may optionally be restricted to a batch.
    """

    __tablename__ = "resources"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(
        UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False
    )
    batch_id = Column(
        UUID(as_uuid=True), ForeignKey("batches.id", ondelete="CASCADE"), nullable=True
    )
    module_id = Column(
        UUID(as_uuid=True), ForeignKey("modules.id", ondelete="CASCADE"), nullable=True
    )
    chapter_id = Column(
        UUID(as_uuid=True), ForeignKey("chapters.id", ondelete="CASCADE"), nullable=True
    )
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    type = Column(String(32), nullable=False)
    file_url = Column(String(512), nullable=True)  # Object storage key / signed URL
    external_url = Column(String(512), nullable=True)  # For external video/document links
    uploader_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    status = Column(String(32), nullable=False, default="draft")
    is_published = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    course = relationship("Course", backref="resources")
    batch = relationship("Batch", backref="resources")
    module = relationship("Module", backref="resources")
    chapter = relationship("Chapter", back_populates="resources")
    uploader = relationship("User", backref="resources")
    bookmarks = relationship("Bookmark", back_populates="resource", cascade="all, delete-orphan")
    completions = relationship("LessonCompletion", back_populates="resource", cascade="all, delete-orphan")
    deletion_requests = relationship("ResourceDeletionRequest", back_populates="resource", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint(
            "type IN ('pdf', 'image', 'assignment_sheet', 'external_video', 'external_document', 'text_lesson')",
            name="chk_resources_type",
        ),
        CheckConstraint(
            "status IN ('draft', 'published', 'unpublished', 'deleted')",
            name="chk_resources_status",
        ),
    )


class ResourceDeletionRequest(Base):
    """Teacher requests deletion of a resource; Admin approves."""

    __tablename__ = "resource_deletion_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    resource_id = Column(
        UUID(as_uuid=True), ForeignKey("resources.id", ondelete="CASCADE"), nullable=False
    )
    requested_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    reason = Column(Text, nullable=True)
    status = Column(String(32), nullable=False, default="pending")
    decided_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    decided_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    resource = relationship("Resource", back_populates="deletion_requests")
    requester = relationship("User", foreign_keys=[requested_by], backref="deletion_requests_made")
    decider = relationship("User", foreign_keys=[decided_by], backref="deletion_requests_decided")

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending', 'approved', 'rejected')",
            name="chk_resource_deletion_requests_status",
        ),
    )

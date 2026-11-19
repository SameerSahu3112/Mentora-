"""Public content domain models.

Phase 9: Notifications and public content
- about_us_content: About Us page content (founder profiles - placeholders until verified)
- testimonials: Testimonials / student success stories (consent-controlled)
- contact_content: Contact / Help page content
"""

import uuid
from sqlalchemy import (
    Column, String, DateTime, Text, Boolean, ForeignKey,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class AboutUsContent(Base):
    """About Us page content.

    Founder profiles for Harshitraj Singh Panwar and Naitik Mujawadiya.
    Placeholders until supplied and verified. Do not invent photos, roles,
    ranks, degrees, achievements, or biographies.
    """

    __tablename__ = "about_us_content"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    section = Column(String(64), nullable=False)  # 'founders', 'mission', 'story'
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=True)
    is_verified = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    updated_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )


class Testimonial(Base):
    """Testimonial / student success story.

    Published only with appropriate consent (PRD §19, §20).
    """

    __tablename__ = "testimonials"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_name = Column(String(255), nullable=True)  # Nullable for anonymous
    student_class = Column(String(4), nullable=True)  # 9, 10, 11, or 12
    course_name = Column(String(100), nullable=True)
    content = Column(Text, nullable=False)
    photo_url = Column(String(512), nullable=True)  # Only with consent
    is_published = Column(Boolean, nullable=False, default=False)
    consent_obtained = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    updated_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )


class ContactContent(Base):
    """Contact / Help page content."""

    __tablename__ = "contact_content"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    section = Column(String(64), nullable=False)  # 'help', 'support', 'email', 'phone'
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    updated_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )

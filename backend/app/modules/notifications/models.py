"""Notification domain models.

Phase 4: In-app notifications (permanent in PostgreSQL)
- notifications: in-app notifications with read/unread state
"""

import uuid
from sqlalchemy import (
    Column, String, DateTime, ForeignKey, Text, Boolean,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Notification(Base):
    """In-app notification, permanently stored in PostgreSQL."""

    __tablename__ = "notifications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recipient_user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    actor_user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    type = Column(String(64), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    data = Column(JSONB, nullable=True)
    is_read = Column(Boolean, nullable=False, default=False)
    read_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    recipient = relationship("User", foreign_keys=[recipient_user_id], backref="notifications")
    actor = relationship("User", foreign_keys=[actor_user_id], backref="sent_notifications")

"""Notification domain Pydantic schemas.

Phase 4: In-app notifications
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class NotificationResponse(BaseModel):
    """Notification response."""

    id: str
    recipient_user_id: str
    actor_user_id: Optional[str] = None
    type: str
    title: str
    message: str
    data: Optional[dict] = None
    is_read: bool
    read_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True


class NotificationCreate(BaseModel):
    """Internal notification creation."""

    recipient_user_id: str
    actor_user_id: Optional[str] = None
    type: str
    title: str
    message: str
    data: Optional[dict] = None

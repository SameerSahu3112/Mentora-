"""Notification routes.

Phase 4: In-app notifications
- GET /student/notifications — my notifications
- PATCH /student/notifications/{id}/read — mark as read
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.notifications.models import Notification
from app.modules.notifications.schemas import NotificationResponse
from app.modules.notifications.service import NotificationService

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("/", response_model=list[NotificationResponse])
async def list_notifications(
    db: AsyncSession = Depends(get_db),
    unread_only: bool = Query(False),
    user_id: UUID = Query(..., description="User ID (from session in production)"),
):
    """List notifications for a user."""
    return await NotificationService.get_user_notifications(db, user_id, unread_only=unread_only)


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
async def mark_notification_read(
    notification_id: UUID,
    user_id: UUID = Query(..., description="User ID (from session in production)"),
    db: AsyncSession = Depends(get_db),
):
    """Mark a notification as read."""
    notification = await NotificationService.mark_as_read(db, notification_id, user_id)
    if notification is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
    return notification


@router.get("/unread-count", response_model=dict)
async def get_unread_count(
    user_id: UUID = Query(..., description="User ID (from session in production)"),
    db: AsyncSession = Depends(get_db),
):
    """Get unread notification count (may be cached in Redis)."""
    count = await NotificationService.get_unread_count(db, user_id)
    return {"unread_count": count}

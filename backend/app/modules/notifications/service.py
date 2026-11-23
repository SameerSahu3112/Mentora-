"""Notification service layer.

Phase 4: In-app notifications
- Create notifications (permanent in PostgreSQL)
- Redis may cache unread counts but is not the source of truth
"""

from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.modules.notifications.models import Notification
from app.modules.notifications.schemas import NotificationCreate


class NotificationService:
    """Business logic for notifications."""

    @staticmethod
    async def create_notification(
        db: AsyncSession,
        recipient_user_id: str,
        actor_user_id: str | None = None,
        type: str = "system",
        title: str = "Notification",
        message: str = "",
        data: dict | None = None,
        commit: bool = True,
    ) -> Notification:
        """Create a new in-app notification.

        Permanently stored in PostgreSQL. Redis may cache unread counts
        but is never the only source of truth.
        """
        notification = Notification(
            recipient_user_id=UUID(recipient_user_id),
            actor_user_id=UUID(actor_user_id) if actor_user_id else None,
            type=type,
            title=title,
            message=message,
            data=data,
        )
        db.add(notification)
        if commit:
            await db.commit()
            await db.refresh(notification)
        else:
            await db.flush()
        return notification

    @staticmethod
    async def get_user_notifications(
        db: AsyncSession, user_id: UUID, unread_only: bool = False
    ) -> list[Notification]:
        """Get notifications for a user."""
        query = select(Notification).where(
            Notification.recipient_user_id == user_id
        )
        if unread_only:
            query = query.where(Notification.is_read == False)  # noqa: E712
        query = query.order_by(Notification.created_at.desc())
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def mark_as_read(
        db: AsyncSession, notification_id: UUID, user_id: UUID
    ) -> Notification | None:
        """Mark a notification as read."""
        result = await db.execute(
            select(Notification).where(
                Notification.id == notification_id,
                Notification.recipient_user_id == user_id,
            )
        )
        notification = result.scalar_one_or_none()
        if notification is None:
            return None
        notification.is_read = True
        notification.read_at = __import__("datetime").datetime.now(__import__("datetime").timezone.utc)
        await db.commit()
        await db.refresh(notification)
        return notification

    @staticmethod
    async def get_unread_count(db: AsyncSession, user_id: UUID) -> int:
        """Get unread notification count for a user."""
        result = await db.execute(
            select(Notification).where(
                Notification.recipient_user_id == user_id,
                Notification.is_read == False,  # noqa: E712
            )
        )
        return len(result.scalars().all())

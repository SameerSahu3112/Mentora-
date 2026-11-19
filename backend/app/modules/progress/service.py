"""Progress service layer.

Phase 6: Resources and learning progress
- Bookmarks: Student bookmarks a resource
- Lesson Completions: Student manually marks a lesson complete
- Opening a resource does NOT automatically mark it complete
"""

from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.modules.progress.models import Bookmark, LessonCompletion
from app.modules.progress.schemas import (
    BookmarkCreate, LessonCompletionCreate,
)
from app.modules.resources.models import Resource


class ProgressService:
    """Business logic for learning progress."""

    # ------------------------------------------------------------------
    # Bookmarks
    # ------------------------------------------------------------------

    @staticmethod
    async def create_bookmark(
        db: AsyncSession,
        student_profile_id: UUID,
        data: BookmarkCreate,
    ) -> Bookmark:
        """Student bookmarks a resource."""
        # Verify resource exists
        resource = await db.execute(
            select(Resource).where(Resource.id == data.resource_id)
        )
        if resource.scalar_one_or_none() is None:
            raise ValueError("Resource not found")

        bookmark = Bookmark(
            student_profile_id=student_profile_id,
            resource_id=UUID(data.resource_id),
        )
        db.add(bookmark)
        try:
            await db.commit()
            await db.refresh(bookmark)
            return bookmark
        except IntegrityError:
            await db.rollback()
            raise ValueError("Resource already bookmarked")

    @staticmethod
    async def remove_bookmark(
        db: AsyncSession,
        student_profile_id: UUID,
        resource_id: UUID,
    ) -> bool:
        """Student removes a bookmark."""
        result = await db.execute(
            select(Bookmark).where(
                Bookmark.student_profile_id == student_profile_id,
                Bookmark.resource_id == resource_id,
            )
        )
        bookmark = result.scalar_one_or_none()
        if bookmark is None:
            return False
        await db.delete(bookmark)
        await db.commit()
        return True

    @staticmethod
    async def list_bookmarks(
        db: AsyncSession, student_profile_id: UUID
    ) -> list[Bookmark]:
        """List all bookmarks for a student."""
        result = await db.execute(
            select(Bookmark).where(
                Bookmark.student_profile_id == student_profile_id
            )
        )
        return result.scalars().all()

    @staticmethod
    async def is_bookmarked(
        db: AsyncSession,
        student_profile_id: UUID,
        resource_id: UUID,
    ) -> bool:
        """Check if a resource is bookmarked by a student."""
        result = await db.execute(
            select(Bookmark).where(
                Bookmark.student_profile_id == student_profile_id,
                Bookmark.resource_id == resource_id,
            )
        )
        return result.scalar_one_or_none() is not None

    # ------------------------------------------------------------------
    # Lesson Completions
    # ------------------------------------------------------------------

    @staticmethod
    async def create_completion(
        db: AsyncSession,
        student_profile_id: UUID,
        data: LessonCompletionCreate,
    ) -> LessonCompletion:
        """Student manually marks a lesson complete.

        Opening a resource does NOT automatically mark it complete —
        requires explicit student action.
        """
        # Verify resource exists
        resource = await db.execute(
            select(Resource).where(Resource.id == data.resource_id)
        )
        if resource.scalar_one_or_none() is None:
            raise ValueError("Resource not found")

        completion = LessonCompletion(
            student_profile_id=student_profile_id,
            resource_id=UUID(data.resource_id),
        )
        db.add(completion)
        try:
            await db.commit()
            await db.refresh(completion)
            return completion
        except IntegrityError:
            await db.rollback()
            raise ValueError("Lesson already marked complete")

    @staticmethod
    async def remove_completion(
        db: AsyncSession,
        student_profile_id: UUID,
        resource_id: UUID,
    ) -> bool:
        """Student unmarks a lesson complete."""
        result = await db.execute(
            select(LessonCompletion).where(
                LessonCompletion.student_profile_id == student_profile_id,
                LessonCompletion.resource_id == resource_id,
            )
        )
        completion = result.scalar_one_or_none()
        if completion is None:
            return False
        await db.delete(completion)
        await db.commit()
        return True

    @staticmethod
    async def list_completions(
        db: AsyncSession, student_profile_id: UUID
    ) -> list[LessonCompletion]:
        """List all completed lessons for a student."""
        result = await db.execute(
            select(LessonCompletion).where(
                LessonCompletion.student_profile_id == student_profile_id
            )
        )
        return result.scalars().all()

    @staticmethod
    async def is_completed(
        db: AsyncSession,
        student_profile_id: UUID,
        resource_id: UUID,
    ) -> bool:
        """Check if a lesson is marked complete by a student."""
        result = await db.execute(
            select(LessonCompletion).where(
                LessonCompletion.student_profile_id == student_profile_id,
                LessonCompletion.resource_id == resource_id,
            )
        )
        return result.scalar_one_or_none() is not None

    @staticmethod
    async def get_resource_progress(
        db: AsyncSession,
        student_profile_id: UUID,
        resource_id: UUID,
    ) -> dict:
        """Get combined progress info for a resource."""
        is_bookmarked = await ProgressService.is_bookmarked(
            db, student_profile_id, resource_id
        )
        is_completed = await ProgressService.is_completed(
            db, student_profile_id, resource_id
        )

        completed_at = None
        if is_completed:
            result = await db.execute(
                select(LessonCompletion.completed_at).where(
                    LessonCompletion.student_profile_id == student_profile_id,
                    LessonCompletion.resource_id == resource_id,
                )
            )
            row = result.first()
            if row:
                completed_at = row[0]

        return {
            "resource_id": str(resource_id),
            "is_bookmarked": is_bookmarked,
            "is_completed": is_completed,
            "completed_at": completed_at,
        }

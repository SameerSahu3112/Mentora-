"""Progress routes.

Phase 6: Resources and learning progress
- Student: GET/POST /student/bookmarks, DELETE /student/bookmarks/{resource_id}
- Student: GET/POST /student/lesson-completions, DELETE /student/lesson-completions/{resource_id}
- Student: GET /student/resources/{resource_id}/progress
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.progress.models import Bookmark, LessonCompletion
from app.modules.progress.schemas import (
    BookmarkCreate, BookmarkResponse,
    LessonCompletionCreate, LessonCompletionResponse,
    ResourceProgressResponse,
)
from app.modules.progress.service import ProgressService

router = APIRouter(prefix="/progress", tags=["progress"])


# ------------------------------------------------------------------
# Bookmark routes (Student)
# ------------------------------------------------------------------

@router.get("/student/bookmarks", response_model=list[BookmarkResponse])
async def student_list_bookmarks(
    db: AsyncSession = Depends(get_db),
):
    """List the current student's bookmarks."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


@router.post("/student/bookmarks", response_model=BookmarkResponse, status_code=status.HTTP_201_CREATED)
async def student_create_bookmark(
    data: BookmarkCreate,
    db: AsyncSession = Depends(get_db),
):
    """Student bookmarks a resource."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


@router.delete("/student/bookmarks/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
async def student_remove_bookmark(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Student removes a bookmark."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


# ------------------------------------------------------------------
# Lesson completion routes (Student)
# ------------------------------------------------------------------

@router.get("/student/lesson-completions", response_model=list[LessonCompletionResponse])
async def student_list_completions(
    db: AsyncSession = Depends(get_db),
):
    """List the current student's completed lessons."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


@router.post("/student/lesson-completions", response_model=LessonCompletionResponse, status_code=status.HTTP_201_CREATED)
async def student_create_completion(
    data: LessonCompletionCreate,
    db: AsyncSession = Depends(get_db),
):
    """Student manually marks a lesson complete.

    Opening a resource does NOT automatically mark it complete.
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


@router.delete("/student/lesson-completions/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
async def student_remove_completion(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Student unmarks a lesson complete."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


# ------------------------------------------------------------------
# Progress info (Student)
# ------------------------------------------------------------------

@router.get("/student/resources/{resource_id}/progress", response_model=ResourceProgressResponse)
async def student_get_resource_progress(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get combined progress info (bookmarked + completed) for a resource."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )

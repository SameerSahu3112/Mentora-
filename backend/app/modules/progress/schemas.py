"""Progress domain Pydantic schemas.

Phase 6: Resources and learning progress
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class BookmarkCreate(BaseModel):
    """Student bookmarks a resource."""

    resource_id: str


class BookmarkResponse(BaseModel):
    id: str
    student_profile_id: str
    resource_id: str
    created_at: datetime

    class Config:
        from_attributes = True


class LessonCompletionCreate(BaseModel):
    """Student manually marks a lesson complete."""

    resource_id: str


class LessonCompletionResponse(BaseModel):
    id: str
    student_profile_id: str
    resource_id: str
    completed_at: datetime

    class Config:
        from_attributes = True


class ResourceProgressResponse(BaseModel):
    """Combined progress info for a resource."""

    resource_id: str
    is_bookmarked: bool
    is_completed: bool
    completed_at: Optional[datetime] = None

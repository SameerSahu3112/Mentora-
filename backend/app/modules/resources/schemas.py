"""Resource domain Pydantic schemas.

Phase 6: Resources and learning progress
"""

from pydantic import BaseModel, Field, HttpUrl
from typing import Optional
from datetime import date, datetime


class ModuleBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    sort_order: int = 0


class ModuleCreate(ModuleBase):
    pass


class ModuleUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    sort_order: Optional[int] = None


class ModuleResponse(ModuleBase):
    id: str
    course_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ChapterBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    sort_order: int = 0


class ChapterCreate(ChapterBase):
    pass


class ChapterUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    sort_order: Optional[int] = None


class ChapterResponse(ChapterBase):
    id: str
    module_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ResourceBase(BaseModel):
    course_id: str
    batch_id: Optional[str] = None
    module_id: Optional[str] = None
    chapter_id: Optional[str] = None
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    type: str
    external_url: Optional[str] = None


class ResourceCreate(ResourceBase):
    pass


class ResourceUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    type: Optional[str] = None
    batch_id: Optional[str] = None
    module_id: Optional[str] = None
    chapter_id: Optional[str] = None
    external_url: Optional[str] = None


class ResourceResponse(ResourceBase):
    id: str
    file_url: Optional[str] = None
    uploader_id: str
    status: str
    is_published: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ResourcePublic(BaseModel):
    """Public-facing resource info (for enrolled students)."""

    id: str
    title: str
    description: Optional[str] = None
    type: str
    module_id: Optional[str] = None
    chapter_id: Optional[str] = None
    is_published: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ResourcePublishRequest(BaseModel):
    """Teacher publishes a draft resource."""

    pass


class ResourceDeletionRequestSchema(BaseModel):
    """Teacher requests deletion of a resource."""

    reason: Optional[str] = None


class ResourceDeletionDecision(BaseModel):
    """Admin approves or rejects a deletion request."""

    status: str = Field(..., description="approved or rejected")


class ResourceDeletionRequestResponse(BaseModel):
    id: str
    resource_id: str
    requested_by: str
    reason: Optional[str] = None
    status: str
    decided_by: Optional[str] = None
    decided_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

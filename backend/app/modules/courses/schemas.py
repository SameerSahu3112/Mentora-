"""Course domain Pydantic schemas.

Phase 3: Courses, batches, teacher assignment
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime
from uuid import UUID


class CourseBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    exam_target: str = Field(..., min_length=1, max_length=100)
    exam_date: Optional[date] = None
    price: float = Field(..., ge=0)
    description: Optional[str] = None
    is_active: bool = True


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    exam_target: Optional[str] = Field(None, min_length=1, max_length=100)
    exam_date: Optional[date] = None
    price: Optional[float] = Field(None, ge=0)
    description: Optional[str] = None
    is_active: Optional[bool] = None


class CourseResponse(CourseBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CoursePublic(BaseModel):
    """Public course info (no sensitive fields)."""

    id: UUID
    name: str
    exam_target: str
    exam_date: Optional[date] = None
    price: float
    is_active: bool

    class Config:
        from_attributes = True


class CourseBatchSummary(BaseModel):
    """Batch summary nested under course."""

    id: str
    name: str
    status: str
    max_capacity: int
    start_date: date
    end_date: date

    class Config:
        from_attributes = True


class CourseWithBatches(CourseResponse):
    batches: list[CourseBatchSummary] = []

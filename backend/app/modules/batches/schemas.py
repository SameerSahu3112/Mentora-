"""Batch domain Pydantic schemas.

Phase 3: Courses, batches, teacher assignment
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import date, datetime
from uuid import UUID


class BatchBase(BaseModel):
    course_id: UUID
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    start_date: date
    end_date: date
    weekly_schedule: Optional[dict] = None
    max_capacity: int = Field(..., gt=0)
    status: str = "active"

    @validator("end_date")
    @classmethod
    def end_after_start(cls, v, values):
        if "start_date" in values and v < values["start_date"]:
            raise ValueError("end_date must be after start_date")
        return v

    @validator("status")
    @classmethod
    def valid_status(cls, v):
        allowed = {"active", "full", "closed", "archived"}
        if v not in allowed:
            raise ValueError(f"status must be one of {allowed}")
        return v


class BatchCreate(BatchBase):
    pass


class BatchUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    weekly_schedule: Optional[dict] = None
    max_capacity: Optional[int] = Field(None, gt=0)
    status: Optional[str] = None


class BatchResponse(BatchBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BatchPublic(BaseModel):
    """Public batch info for browsing."""

    id: UUID
    course_id: UUID
    name: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    max_capacity: int
    status: str
    course_name: str

    class Config:
        from_attributes = True


class BatchTeacherAssign(BaseModel):
    teacher_profile_id: UUID


class BatchTeacherResponse(BaseModel):
    id: UUID
    batch_id: UUID
    teacher_profile_id: UUID
    assigned_at: datetime

    class Config:
        from_attributes = True


class BatchCapacityInfo(BaseModel):
    """Capacity information for a batch."""

    batch_id: str
    name: str
    max_capacity: int
    reserved_seats: int
    available_seats: int
    is_full: bool

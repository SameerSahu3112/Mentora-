"""User profile Pydantic schemas.

Phase 2: Identity and Access Control
"""

from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional
from datetime import datetime


class StudentProfileResponse(BaseModel):
    """Student profile response."""

    id: str
    user_id: str
    student_id: str
    full_name: str
    class_level: str
    email: str
    phone: str
    school_name: Optional[str] = None
    coaching_institute_name: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TeacherProfileResponse(BaseModel):
    """Teacher profile response (no phone for students)."""

    id: str
    user_id: str
    full_name: str
    bio: Optional[str] = None
    is_public: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TeacherProfileAdminResponse(TeacherProfileResponse):
    """Teacher profile response for Admin (includes phone)."""

    phone: Optional[str] = None


class TeacherCreateRequest(BaseModel):
    """Admin creates a teacher account (no self-registration)."""

    full_name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=32)
    bio: Optional[str] = Field(None, max_length=1000)
    password: str = Field(..., min_length=8)

    @validator("email")  # type: ignore[misc]
    @classmethod
    def normalize_email(cls, v: str) -> str:
        return v.strip().lower()


class UserResponse(BaseModel):
    """User account response."""

    id: str
    email: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

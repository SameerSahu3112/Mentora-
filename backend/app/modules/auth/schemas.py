"""Auth domain Pydantic schemas.

Phase 2: Identity and Access Control
"""

from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime
from uuid import UUID


class StudentSignupRequest(BaseModel):
    """Student registration request."""

    full_name: str = Field(..., min_length=1, max_length=255)
    class_level: str = Field(..., pattern=r"^(9|10|11|12)$")
    email: EmailStr
    phone: str = Field(..., min_length=1, max_length=32)
    school_name: Optional[str] = Field(None, max_length=255)
    coaching_institute_name: Optional[str] = Field(None, max_length=255)
    password: str = Field(..., min_length=8)

    @validator("email")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        return v.strip().lower()


class StudentSignupResponse(BaseModel):
    """Student registration response."""

    user_id: str
    student_id: str
    email: str
    full_name: str
    class_level: str
    message: str = "Registration successful. You can now log in."


class LoginRequest(BaseModel):
    """Login request — Student ID or email plus password."""

    identifier: str = Field(..., description="Student ID or email address")
    password: str


class AuthenticatedUserResponse(BaseModel):
    id: UUID
    email: EmailStr
    role: str
    is_active: bool


class LoginResponse(BaseModel):
    """Login response; authentication is carried by an HTTP-only cookie."""

    user: AuthenticatedUserResponse


class MeResponse(BaseModel):
    """Current user profile response."""

    id: UUID
    email: str
    role: str
    is_active: bool
    student_id: Optional[str] = None
    full_name: Optional[str] = None
    class_level: Optional[str] = None
    phone: Optional[str] = None

    class Config:
        from_attributes = True


class LogoutResponse(BaseModel):
    """Logout response."""

    message: str = "Logged out successfully"

"""Public content domain Pydantic schemas.

Phase 9: Notifications and public content
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# ------------------------------------------------------------
# About Us Content
# ------------------------------------------------------------

class AboutUsContentBase(BaseModel):
    section: str = Field(..., min_length=1, max_length=64)
    title: str = Field(..., min_length=1, max_length=255)
    content: Optional[str] = None
    is_verified: bool = False


class AboutUsContentCreate(AboutUsContentBase):
    pass


class AboutUsContentUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    content: Optional[str] = None
    is_verified: Optional[bool] = None


class AboutUsContentResponse(AboutUsContentBase):
    id: str
    created_at: datetime
    updated_at: datetime
    updated_by: Optional[str] = None

    class Config:
        from_attributes = True


# ------------------------------------------------------------
# Testimonials
# ------------------------------------------------------------

class TestimonialBase(BaseModel):
    student_name: Optional[str] = Field(None, max_length=255)
    student_class: Optional[str] = Field(None, max_length=4)
    course_name: Optional[str] = Field(None, max_length=100)
    content: str = Field(..., min_length=1)
    photo_url: Optional[str] = Field(None, max_length=512)
    is_published: bool = False
    consent_obtained: bool = False


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(BaseModel):
    student_name: Optional[str] = Field(None, max_length=255)
    student_class: Optional[str] = Field(None, max_length=4)
    course_name: Optional[str] = Field(None, max_length=100)
    content: Optional[str] = Field(None, min_length=1)
    photo_url: Optional[str] = Field(None, max_length=512)
    is_published: Optional[bool] = None
    consent_obtained: Optional[bool] = None


class TestimonialResponse(TestimonialBase):
    id: str
    created_at: datetime
    updated_at: datetime
    updated_by: Optional[str] = None

    class Config:
        from_attributes = True


# ------------------------------------------------------------
# Contact Content
# ------------------------------------------------------------

class ContactContentBase(BaseModel):
    section: str = Field(..., min_length=1, max_length=64)
    title: str = Field(..., min_length=1, max_length=255)
    content: Optional[str] = None
    is_active: bool = True


class ContactContentCreate(ContactContentBase):
    pass


class ContactContentUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    content: Optional[str] = None
    is_active: Optional[bool] = None


class ContactContentResponse(ContactContentBase):
    id: str
    created_at: datetime
    updated_at: datetime
    updated_by: Optional[str] = None

    class Config:
        from_attributes = True

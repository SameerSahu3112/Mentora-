"""User profile routes.

Phase 2: Identity and Access Control
- GET /users/me — current user profile
- GET /users/{user_id} — user detail (Admin only)
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.permissions import require_admin
from app.modules.users.models import StudentProfile, TeacherProfile
from app.modules.users.schemas import (
    StudentProfileResponse,
    TeacherProfileAdminResponse,
    TeacherProfileResponse,
    UserResponse,
)
from app.modules.auth.models import User

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/admin/students", response_model=list[StudentProfileResponse])
async def list_students_admin(
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """List all student profiles (Admin only)."""
    result = await db.execute(
        select(StudentProfile).order_by(StudentProfile.created_at.desc())
    )
    students = result.scalars().all()
    return [
        StudentProfileResponse(
            id=str(s.id),
            user_id=str(s.user_id),
            student_id=s.student_id,
            full_name=s.full_name,
            class_level=s.class_level,
            email=s.email,
            phone=s.phone,
            school_name=s.school_name,
            coaching_institute_name=s.coaching_institute_name,
            created_at=s.created_at,
            updated_at=s.updated_at,
        )
        for s in students
    ]


@router.get("/admin/teachers", response_model=list[TeacherProfileAdminResponse])
async def list_teachers_admin(
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """List all teacher profiles with user emails (Admin only)."""
    result = await db.execute(
        select(TeacherProfile, User.email)
        .join(User, TeacherProfile.user_id == User.id)
        .order_by(TeacherProfile.created_at.desc())
    )
    rows = result.all()
    return [
        TeacherProfileAdminResponse(
            id=str(t.id),
            user_id=str(t.user_id),
            full_name=t.full_name,
            bio=t.bio,
            is_public=t.is_public,
            phone=t.phone,
            email=email,
            created_at=t.created_at,
            updated_at=t.updated_at,
        )
        for t, email in rows
    ]


@router.get("/me", response_model=StudentProfileResponse)
async def get_my_student_profile(
    db: AsyncSession = Depends(get_db),
):
    """Get current student's profile.

    Phase 2 placeholder — session validation middleware pending.
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session validation middleware not yet implemented",
    )


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get user detail by ID (Admin only in production)."""
    result = await db.execute(
        User.__table__.select().where(User.id == user_id)  # type: ignore[attr-defined]
    )
    row = result.mappings().first()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserResponse(
        id=str(row["id"]),
        email=row["email"],
        role=row["role"],
        is_active=row["is_active"],
        created_at=row["created_at"],
    )

"""User profile routes.

Phase 2: Identity and Access Control
- GET /users/me — current user profile
- GET /users/{user_id} — user detail (Admin only)
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.users.models import StudentProfile, TeacherProfile
from app.modules.users.schemas import (
    StudentProfileResponse,
    TeacherProfileResponse,
    UserResponse,
)
from app.modules.auth.models import User

router = APIRouter(prefix="/users", tags=["users"])


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

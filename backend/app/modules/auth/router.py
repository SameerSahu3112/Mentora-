"""Auth domain routes.

Phase 2: Identity and Access Control
- POST /auth/signup — student registration
- POST /auth/login — login with Student ID or email + password
- POST /auth/logout — logout
- GET /auth/me — current user profile
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.permissions import require_admin
from app.core.security import hash_password
from app.modules.auth.schemas import (
    StudentSignupRequest,
    StudentSignupResponse,
    LoginRequest,
    LoginResponse,
    MeResponse,
    LogoutResponse,
)
from app.modules.auth.service import AuthService
from app.modules.users.schemas import TeacherCreateRequest, TeacherProfileAdminResponse
from app.modules.users.models import StudentProfile, TeacherProfile
from app.modules.auth.models import User, UserRole
from app.modules.auth.dependencies import get_current_user as get_authenticated_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=StudentSignupResponse, status_code=status.HTTP_201_CREATED)
async def signup_student(
    data: StudentSignupRequest,
    db: AsyncSession = Depends(get_db),
):
    """Register a new student.

    Creates user account, student profile, and assigns the student role.
    Generates a unique Student ID. Password is hashed with Argon2id.
    """
    try:
        profile = await AuthService.signup_student(db, data)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc))

    return StudentSignupResponse(
        user_id=str(profile.user_id),
        student_id=profile.student_id,
        email=profile.email,
        full_name=profile.full_name,
        class_level=profile.class_level,
    )


@router.post("/login", response_model=LoginResponse)
async def login(
    data: LoginRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """Log in with Student ID or email plus password.

    On success, sets a secure HTTP-only session cookie.
    """
    user = await AuthService.authenticate(db, data.identifier, data.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    request.session.clear()
    request.session["user_id"] = str(user.id)

    return LoginResponse(
        user={
            "id": str(user.id),
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
        },
    )


@router.post("/logout", response_model=LogoutResponse)
async def logout(request: Request):
    """Log out — clear the signed session cookie."""
    request.session.clear()
    return LogoutResponse()


@router.get("/me", response_model=MeResponse)
async def get_current_user(
    current_user: User = Depends(get_authenticated_user),
):
    """Get the current user's profile from the signed session."""
    profile = current_user.student_profile
    return MeResponse(
        id=current_user.id,
        email=current_user.email,
        role=current_user.role,
        is_active=current_user.is_active,
        student_id=profile.student_id if profile else None,
        full_name=profile.full_name if profile else (
            current_user.teacher_profile.full_name
            if current_user.teacher_profile
            else None
        ),
        class_level=profile.class_level if profile else None,
        phone=profile.phone if profile else (
            current_user.teacher_profile.phone
            if current_user.teacher_profile
            else None
        ),
    )


# ---------------------------------------------------------------------------
# Admin-only: create teacher account (no teacher self-registration)
# ---------------------------------------------------------------------------

@router.post(
    "/admin/teachers",
    response_model=TeacherProfileAdminResponse,
    status_code=status.HTTP_201_CREATED,
)
async def admin_create_teacher(
    data: TeacherCreateRequest,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin creates a teacher account.

    Teachers cannot self-register. Only Admin can call this endpoint.
    Phase 2: role check is a placeholder; full admin auth in Phase 2 middleware.
    """
    # Check email uniqueness
    existing = await db.execute(
        User.__table__.select().where(User.email == data.email)  # type: ignore[attr-defined]
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    password_hash = hash_password(data.password)

    try:
        user = User(
            email=data.email,
            password_hash=password_hash,
            role="teacher",
            is_active=True,
        )
        db.add(user)
        await db.flush()

        user_role = UserRole(user_id=user.id, role="teacher")
        db.add(user_role)

        profile = TeacherProfile(
            user_id=user.id,
            full_name=data.full_name,
            phone=data.phone,
            bio=data.bio,
            is_public=False,
        )
        db.add(profile)

        await db.commit()
        await db.refresh(profile)
        return profile

    except Exception:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create teacher account",
        )

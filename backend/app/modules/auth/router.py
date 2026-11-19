"""Auth domain routes.

Phase 2: Identity and Access Control
- POST /auth/signup — student registration
- POST /auth/login — login with Student ID or email + password
- POST /auth/logout — logout
- GET /auth/me — current user profile
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import hash_password
from app.modules.auth.schemas import (
    StudentSignupRequest,
    StudentSignupResponse,
    LoginRequest,
    TokenResponse,
    MeResponse,
    LogoutResponse,
)
from app.modules.auth.service import AuthService
from app.modules.users.schemas import TeacherCreateRequest, TeacherProfileAdminResponse
from app.modules.users.models import StudentProfile, TeacherProfile
from app.modules.auth.models import User, UserRole

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


@router.post("/login", response_model=TokenResponse)
async def login(
    data: LoginRequest,
    response: Response,
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

    # Phase 2: simple session token placeholder
    # In production, this would be a signed JWT or session ID stored in Redis
    session_token = f"sess_{user.id}"

    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=False,  # Set True in production with HTTPS
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return TokenResponse(
        access_token=session_token,
        user={
            "id": str(user.id),
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
        },
    )


@router.post("/logout", response_model=LogoutResponse)
async def logout(response: Response):
    """Log out — clear the session cookie."""
    response.delete_cookie(key="session_token")
    return LogoutResponse()


@router.get("/me", response_model=MeResponse)
async def get_current_user(
    db: AsyncSession = Depends(get_db),
):
    """Get current user profile.

    Phase 2 placeholder: reads session cookie to identify user.
    Full session validation implemented in Phase 2 auth middleware.
    """
    # Phase 2: for now, return a placeholder; actual session validation
    # is wired up with the auth middleware in Phase 2.
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session validation middleware not yet implemented",
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

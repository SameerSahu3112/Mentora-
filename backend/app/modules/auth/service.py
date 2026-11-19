"""Auth service layer.

Phase 2: Identity and Access Control
- Student signup with unique Student ID generation
- Login with Student ID or email + password
- Password hashing with Argon2id (never plain text)
- Session management placeholder
"""

import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.exc import IntegrityError

from app.core.security import hash_password, verify_password
from app.core.config import settings
from app.modules.auth.models import User, UserRole
from app.modules.users.models import StudentProfile
from app.modules.auth.schemas import StudentSignupRequest, LoginRequest


class StudentIDGenerator:
    """Generates unique Student IDs in the format MENT-YYYY-NNNN."""

    @staticmethod
    async def generate(db: AsyncSession) -> str:
        """Generate a unique student ID.

        Format: MENT-YYYY-NNNN where YYYY is the current year and NNNN is a
        zero-padded sequence based on the count of existing student profiles.
        """
        year = datetime.now(timezone.utc).year
        prefix = f"MENT-{year}-"

        # Count existing student profiles to determine next sequence number
        result = await db.execute(
            select(func.count(StudentProfile.id)).where(
                StudentProfile.student_id.like(f"{prefix}%")
            )
        )
        count = result.scalar() or 0
        next_seq = count + 1
        student_id = f"{prefix}{next_seq:04d}"

        # Ensure uniqueness (retry if a race condition created a duplicate)
        while True:
            existing = await db.execute(
                select(StudentProfile).where(StudentProfile.student_id == student_id)
            )
            if existing.scalar_one_or_none() is None:
                return student_id
            next_seq += 1
            student_id = f"{prefix}{next_seq:04d}"


class AuthService:
    """Authentication and registration business logic."""

    @staticmethod
    async def signup_student(
        db: AsyncSession,
        data: StudentSignupRequest,
    ) -> StudentProfile:
        """Register a new student.

        - Normalizes email (lowercase, trimmed)
        - Validates email uniqueness
        - Generates unique Student ID
        - Hashes password with Argon2id
        - Creates user + student profile + student role
        - Uses a database transaction for atomicity
        """
        # Check email uniqueness
        existing_email = await db.execute(
            select(User).where(User.email == data.email)
        )
        if existing_email.scalar_one_or_none():
            raise ValueError("Email already registered")

        # Generate unique Student ID
        student_id = await StudentIDGenerator.generate(db)

        # Hash password
        password_hash = hash_password(data.password)

        # Create user within a transaction
        try:
            user = User(
                email=data.email,
                password_hash=password_hash,
                role="student",
                is_active=True,
            )
            db.add(user)
            await db.flush()  # Get user.id without committing

            # Assign student role
            user_role = UserRole(user_id=user.id, role="student")
            db.add(user_role)

            # Create student profile
            profile = StudentProfile(
                user_id=user.id,
                student_id=student_id,
                full_name=data.full_name,
                class_level=data.class_level,
                email=data.email,
                phone=data.phone,
                school_name=data.school_name,
                coaching_institute_name=data.coaching_institute_name,
            )
            db.add(profile)

            await db.commit()
            await db.refresh(profile)
            return profile

        except IntegrityError:
            await db.rollback()
            raise ValueError("Registration failed due to a duplicate identifier")

    @staticmethod
    async def authenticate(
        db: AsyncSession,
        identifier: str,
        password: str,
    ) -> Optional[User]:
        """Authenticate a user by Student ID or email + password.

        - Normalizes email lookups (lowercase)
        - Falls back to Student ID lookup if email not found
        - Verifies Argon2id password hash
        - Never reveals whether the identifier exists (timing-safe-ish)
        """
        # Try email lookup first (normalized)
        user = await db.execute(
            select(User).where(User.email == identifier.strip().lower())
        )
        user = user.scalar_one_or_none()

        # Fall back to Student ID lookup
        if user is None:
            result = await db.execute(
                select(User)
                .join(StudentProfile)
                .where(StudentProfile.student_id == identifier.strip())
            )
            user = result.scalar_one_or_none()

        if user is None:
            return None

        if not user.is_active:
            return None

        # Verify password
        if not verify_password(password, user.password_hash):
            return None

        # Update last login
        user.last_login_at = datetime.now(timezone.utc)
        await db.commit()

        return user

    @staticmethod
    async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
        """Get a user by normalized email."""
        result = await db.execute(
            select(User).where(User.email == email.strip().lower())
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_user_by_id(db: AsyncSession, user_id: uuid.UUID) -> Optional[User]:
        """Get a user by ID."""
        result = await db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

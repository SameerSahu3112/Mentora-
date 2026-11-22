"""Secure Admin and Teacher bootstrap command.

Phase 2: Identity and Access Control

Bootstraps the two initial Admin accounts and Teacher accounts through a secure one-time command.
Never hard-codes default permanent passwords. Prompts for passwords interactively or via environment variables.

Usage:
    python -m app.bootstrap
    # or with env vars:
    ADMIN1_EMAIL=admin1@mentora.example.com ADMIN2_EMAIL=admin2@mentora.example.com \
    ADMIN1_PASSWORD=... ADMIN2_PASSWORD=... \
    TEACHER1_EMAIL=teacher1@mentora.example.com TEACHER2_EMAIL=teacher2@mentora.example.com \
    TEACHER1_PASSWORD=... TEACHER2_PASSWORD=... \
    python -m app.bootstrap
"""

import asyncio
import getpass
import os
import sys
import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import engine, AsyncSessionLocal, Base
from app.modules.auth.models import User, UserRole


async def bootstrap_admins_and_teachers() -> None:
    """Create the two initial Admin accounts and Teacher accounts securely."""

    # ---------- Admin Accounts ----------
    admin1_email = os.getenv("ADMIN1_EMAIL", "").strip().lower()
    admin2_email = os.getenv("ADMIN2_EMAIL", "").strip().lower()

    if not admin1_email:
        admin1_email = input("Admin 1 email: ").strip().lower()
    if not admin2_email:
        admin2_email = input("Admin 2 email: ").strip().lower()

    if not admin1_email or not admin2_email:
        print("ERROR: Both Admin emails are required.", file=sys.stderr)
        sys.exit(1)

    if admin1_email == admin2_email:
        print("ERROR: Admin emails must be distinct.", file=sys.stderr)
        sys.exit(1)

    admin1_password = os.getenv("ADMIN1_PASSWORD")
    if not admin1_password:
        admin1_password = getpass.getpass(f"Password for {admin1_email}: ")
    admin2_password = os.getenv("ADMIN2_PASSWORD")
    if not admin2_password:
        admin2_password = getpass.getpass(f"Password for {admin2_email}: ")

    if not admin1_password or not admin2_password:
        print("ERROR: Both Admin passwords are required.", file=sys.stderr)
        sys.exit(1)

    if len(admin1_password) < 8 or len(admin2_password) < 8:
        print("ERROR: Passwords must be at least 8 characters.", file=sys.stderr)
        sys.exit(1)

    # ---------- Teacher Accounts ----------
    teacher1_email = os.getenv("TEACHER1_EMAIL", "").strip().lower()
    teacher2_email = os.getenv("TEACHER2_EMAIL", "").strip().lower()

    if not teacher1_email:
        teacher1_email = input("Teacher 1 email (or press Enter to skip): ").strip().lower()
    if not teacher2_email:
        teacher2_email = input("Teacher 2 email (or press Enter to skip): ").strip().lower()

    teacher1_password = os.getenv("TEACHER1_PASSWORD")
    if not teacher1_password and teacher1_email:
        teacher1_password = getpass.getpass(f"Password for {teacher1_email}: ")
    teacher2_password = os.getenv("TEACHER2_PASSWORD")
    if not teacher2_password and teacher2_email:
        teacher2_password = getpass.getpass(f"Password for {teacher2_email}:")

    async with AsyncSessionLocal() as db:
        # Check if admins already exist
        for email in (admin1_email, admin2_email):
            existing = await db.execute(select(User).where(User.email == email))
            if existing.scalar_one_or_none():
                print(f"ERROR: Admin already exists: {email}", file=sys.stderr)
                sys.exit(1)

        from app.core.security import hash_password

        try:
            # Create Admin 1
            user1 = User(
                id=uuid.uuid4(),
                email=admin1_email,
                password_hash=hash_password(admin1_password),
                role="admin",
                is_active=True,
            )
            db.add(user1)
            await db.flush()
            role1 = UserRole(user_id=user1.id, role="admin")
            db.add(role1)

            # Create Admin 2
            user2 = User(
                id=uuid.uuid4(),
                email=admin2_email,
                password_hash=hash_password(admin2_password),
                role="admin",
                is_active=True,
            )
            db.add(user2)
            await db.flush()
            role2 = UserRole(user_id=user2.id, role="admin")
            db.add(role2)

            await db.commit()
            print(f"\nAdmin accounts bootstrapped successfully:")
            print(f"  1. {admin1_email}")
            print(f"  2. {admin2_email}")
            print("\nSecure these credentials. Do not store them in version control.")

            # Create Teacher accounts
            for email, password in [(teacher1_email, teacher1_password), (teacher2_email, teacher2_password)]:
                if not email or not password:
                    continue
                # Check if teacher already exists
                existing = await db.execute(select(User).where(User.email == email))
                if existing.scalar_one_or_none():
                    print(f"Teacher already exists: {email}")
                    continue
                try:
                    teacher_user = User(
                        id=uuid.uuid4(),
                        email=email,
                        password_hash=hash_password(password),
                        role="teacher",
                        is_active=True,
                    )
                    db.add(teacher_user)
                    await db.flush()
                    teacher_role = UserRole(user_id=teacher_user.id, role="teacher")
                    db.add(teacher_role)
                    await db.commit()
                    print(f"  Teacher created: {email}")
                except Exception as exc:
                    await db.rollback()
                    print(f"ERROR: Failed to create teacher {email}: {exc}", file=sys.stderr)

            print(f"\nAll accounts bootstrapped successfully!")

        except Exception as exc:
            await db.rollback()
            print(f"ERROR: Bootstrap failed: {exc}", file=sys.stderr)
            sys.exit(1)


if __name__ == "__main__":
    # Ensure tables exist before bootstrapping
    async def init_and_bootstrap():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        await bootstrap_admins_and_teachers()

    asyncio.run(init_and_bootstrap())
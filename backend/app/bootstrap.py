"""Secure Admin bootstrap command.

Phase 2: Identity and Access Control

Bootstraps the two initial Admin accounts through a secure one-time command.
Never hard-codes a default permanent Admin password. Prompts for passwords
interactively or via environment variables.

Usage:
    python -m app.bootstrap
    # or with env vars:
    ADMIN1_EMAIL=admin1@example.com ADMIN2_EMAIL=admin2@example.com python -m app.bootstrap
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


async def bootstrap_admins() -> None:
    """Create the two initial Admin accounts securely."""

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

        except Exception as exc:
            await db.rollback()
            print(f"ERROR: Bootstrap failed: {exc}", file=sys.stderr)
            sys.exit(1)


if __name__ == "__main__":
    # Ensure tables exist before bootstrapping
    async def init_and_bootstrap():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        await bootstrap_admins()

    asyncio.run(init_and_bootstrap())

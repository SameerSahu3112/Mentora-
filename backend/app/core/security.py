"""Security utilities: password hashing with Argon2id.

Phase 1: Project Foundation
- Argon2id password hashing (never plain text)
- Password verification
"""

from argon2 import PasswordHasher
from argon2.exceptions import VerificationError as VerifyError


# Argon2id hasher with secure defaults
ph = PasswordHasher(
    time_cost=3,
    memory_cost=65536,
    parallelism=4,
    hash_len=32,
    salt_len=16,
)


def hash_password(password: str) -> str:
    """Hash a plain-text password using Argon2id.

    Returns the encoded hash string to store in the database.
    Never stores plain-text passwords.
    """
    return ph.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain-text password against an Argon2id hash.

    Returns True if the password matches, False otherwise.
    """
    try:
        ph.verify(hashed_password, plain_password)
        return True
    except VerifyError:
        return False

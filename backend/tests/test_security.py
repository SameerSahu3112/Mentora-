"""Security utility tests.

Phase 1: Project Foundation
- Verifies Argon2id password hashing works
- Verifies passwords are never stored in plain text
- Verifies password verification succeeds/fails correctly
"""

from app.core.security import hash_password, verify_password


def test_hash_password_returns_non_plaintext():
    """Hashed password must differ from the plain password."""
    plain = "securePassword123"
    hashed = hash_password(plain)
    assert hashed != plain
    assert len(hashed) > 0


def test_verify_password_correct():
    """Verifying a correct password returns True."""
    plain = "securePassword123"
    hashed = hash_password(plain)
    assert verify_password(plain, hashed) is True


def test_verify_password_incorrect():
    """Verifying an incorrect password returns False."""
    plain = "securePassword123"
    wrong = "wrongPassword123"
    hashed = hash_password(plain)
    assert verify_password(wrong, hashed) is False

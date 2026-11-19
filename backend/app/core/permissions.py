"""Role and object-level permission dependencies.

Phase 1: Project Foundation
- Role-based access dependencies (student, teacher, admin)
- Object-level access rules are enforced in service layers
"""

from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings

# OAuth2 scheme for token extraction (placeholder for Phase 2 auth)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def require_role(required_role: str):
    """Return a dependency that requires the given role.

    Placeholder in Phase 1 — full auth implemented in Phase 2.
    """

    async def role_dependency(token: Annotated[str, Depends(oauth2_scheme)]):
        # Phase 1: accept any token; Phase 2 validates and extracts role
        if required_role not in ("student", "teacher", "admin"):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Invalid role configuration",
            )
        return {"role": required_role, "token": token}

    return role_dependency


require_student = require_role("student")
require_teacher = require_role("teacher")
require_admin = require_role("admin")

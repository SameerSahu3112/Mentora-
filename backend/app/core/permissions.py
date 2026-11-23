"""Role and object-level permission dependencies.

Phase 1: Project Foundation
- Role-based access dependencies (student, teacher, admin)
- Object-level access rules are enforced in service layers
"""

from fastapi import Depends, HTTPException, status
from app.modules.auth.dependencies import get_current_user
from app.modules.auth.models import User


def require_role(required_role: str):
    """Return a dependency that requires an authenticated user with this role."""

    async def role_dependency(current_user: User = Depends(get_current_user)):
        if required_role not in ("student", "teacher", "admin"):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Invalid role configuration",
            )
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return current_user

    return role_dependency


require_student = require_role("student")
require_teacher = require_role("teacher")
require_admin = require_role("admin")

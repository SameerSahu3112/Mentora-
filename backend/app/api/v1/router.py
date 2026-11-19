"""API v1 router.

Phase 1 & 2: Project Foundation + Identity and Access Control
- Mounts all domain routers under /api/v1
"""

from fastapi import APIRouter

api_router = APIRouter()

# Domain routers
from app.modules.auth.router import router as auth_router  # noqa: E402
from app.modules.users.router import router as users_router  # noqa: E402
from app.modules.courses.router import router as courses_router  # noqa: E402
from app.modules.batches.router import router as batches_router  # noqa: E402
from app.modules.applications.router import router as applications_router  # noqa: E402
from app.modules.notifications.router import router as notifications_router  # noqa: E402
from app.modules.enrollments.router import router as enrollments_router  # noqa: E402
from app.modules.resources.router import router as resources_router  # noqa: E402
from app.modules.progress.router import router as progress_router  # noqa: E402
from app.modules.mentorship.router import router as mentorship_router  # noqa: E402
from app.modules.approvals.router import router as approvals_router  # noqa: E402
from app.modules.public_content.router import router as public_content_router  # noqa: E402

api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(courses_router)
api_router.include_router(batches_router)
api_router.include_router(applications_router)
api_router.include_router(notifications_router)
api_router.include_router(enrollments_router)
api_router.include_router(resources_router)
api_router.include_router(progress_router)
api_router.include_router(mentorship_router)
api_router.include_router(approvals_router)
api_router.include_router(public_content_router)


@api_router.get("/")
async def api_root():
    """API root — confirms the API is running."""
    return {"name": "Mentora API", "version": "0.1.0"}

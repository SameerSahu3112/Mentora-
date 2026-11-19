"""Resource routes.

Phase 6: Resources and learning progress
- Public: GET /resources/modules/{course_id}, GET /resources/chapters/{module_id}
- Student: GET /student/resources, GET /student/resources/{id}, GET /student/resources/{id}/download-url
- Teacher: POST /teacher/resources, PUT /teacher/resources/{id}, POST /teacher/resources/{id}/publish, DELETE /teacher/resources/{id}/deletion-request
- Admin: GET /admin/resources, PUT /admin/resources/{id}/unpublish, GET /admin/resources/deletion-requests, PATCH /admin/resources/deletion-requests/{id}/decide
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.resources.models import Module, Chapter, Resource, ResourceDeletionRequest
from app.modules.resources.schemas import (
    ModuleCreate, ModuleUpdate, ModuleResponse,
    ChapterCreate, ChapterUpdate, ChapterResponse,
    ResourceCreate, ResourceUpdate, ResourceResponse,
    ResourcePublic,
    ResourceDeletionRequestSchema, ResourceDeletionDecision, ResourceDeletionRequestResponse,
)
from app.modules.resources.service import (
    ModuleService, ChapterService, ResourceService, ResourceDeletionService,
)

router = APIRouter(prefix="/resources", tags=["resources"])


# ------------------------------------------------------------------
# Module routes
# ------------------------------------------------------------------

@router.post("/modules", response_model=ModuleResponse, status_code=status.HTTP_201_CREATED)
async def create_module(
    course_id: UUID,
    data: ModuleCreate,
    db: AsyncSession = Depends(get_db),
):
    """Create a module within a course (Admin/Teacher)."""
    module = await ModuleService.create_module(db, course_id, data)
    return module


@router.get("/modules/{course_id}", response_model=list[ModuleResponse])
async def list_modules(
    course_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """List modules for a course (public)."""
    return await ModuleService.list_modules(db, course_id)


# ------------------------------------------------------------------
# Chapter routes
# ------------------------------------------------------------------

@router.post("/chapters", response_model=ChapterResponse, status_code=status.HTTP_201_CREATED)
async def create_chapter(
    module_id: UUID,
    data: ChapterCreate,
    db: AsyncSession = Depends(get_db),
):
    """Create a chapter within a module (Admin/Teacher)."""
    chapter = await ChapterService.create_chapter(db, module_id, data)
    return chapter


@router.get("/chapters/{module_id}", response_model=list[ChapterResponse])
async def list_chapters(
    module_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """List chapters for a module (public)."""
    return await ChapterService.list_chapters(db, module_id)


# ------------------------------------------------------------------
# Resource routes (Student - access gated by active enrollment)
# ------------------------------------------------------------------

@router.get("/student/resources", response_model=list[ResourcePublic])
async def student_list_resources(
    course_id: UUID | None = Query(None),
    batch_id: UUID | None = Query(None),
    module_id: UUID | None = Query(None),
    chapter_id: UUID | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """List published resources accessible via active enrollments.

    Phase 6: student_profile_id comes from session/auth middleware.
    Placeholder: returns all published resources for now.
    """
    resources = await ResourceService.list_resources(
        db, course_id=course_id, batch_id=batch_id,
        module_id=module_id, chapter_id=chapter_id,
        published_only=True,
    )
    return resources


@router.get("/student/resources/{resource_id}", response_model=ResourcePublic)
async def student_get_resource(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a single published resource (access gated by enrollment)."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


@router.get("/student/resources/{resource_id}/download-url")
async def student_get_download_url(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a signed download URL for a resource (access gated by enrollment)."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


# ------------------------------------------------------------------
# Resource routes (Teacher)
# ------------------------------------------------------------------

@router.post("/teacher/resources", response_model=ResourceResponse, status_code=status.HTTP_201_CREATED)
async def teacher_create_resource(
    data: ResourceCreate,
    db: AsyncSession = Depends(get_db),
):
    """Teacher creates a draft resource."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based teacher identification pending auth middleware",
    )


@router.put("/teacher/resources/{resource_id}", response_model=ResourceResponse)
async def teacher_update_resource(
    resource_id: UUID,
    data: ResourceUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Teacher updates their own draft resource."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based teacher identification pending auth middleware",
    )


@router.post("/teacher/resources/{resource_id}/publish", response_model=ResourceResponse)
async def teacher_publish_resource(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Teacher publishes a draft resource."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based teacher identification pending auth middleware",
    )


@router.delete("/teacher/resources/{resource_id}/deletion-request", status_code=status.HTTP_204_NO_CONTENT)
async def teacher_request_deletion(
    resource_id: UUID,
    data: ResourceDeletionRequestSchema,
    db: AsyncSession = Depends(get_db),
):
    """Teacher requests deletion of their own resource."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based teacher identification pending auth middleware",
    )


# ------------------------------------------------------------------
# Resource routes (Admin)
# ------------------------------------------------------------------

@router.get("/admin/resources", response_model=list[ResourceResponse])
async def admin_list_resources(
    course_id: UUID | None = Query(None),
    batch_id: UUID | None = Query(None),
    status: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """Admin: list all resources (all teachers)."""
    return await ResourceService.list_resources(
        db, course_id=course_id, batch_id=batch_id,
        published_only=False,
    )


@router.put("/admin/resources/{resource_id}/unpublish", response_model=ResourceResponse)
async def admin_unpublish_resource(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Admin unpublishes a resource (takes effect immediately)."""
    resource = await ResourceService.get_resource(db, resource_id)
    if resource is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
    return await ResourceService.unpublish_resource(db, resource)


@router.get("/admin/resources/deletion-requests", response_model=list[ResourceDeletionRequestResponse])
async def admin_list_deletion_requests(
    status: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """Admin: list resource deletion requests."""
    return await ResourceDeletionService.list_deletion_requests(db, status=status)


@router.patch(
    "/admin/resources/deletion-requests/{request_id}/decide",
    response_model=ResourceDeletionRequestResponse,
)
async def admin_decide_deletion_request(
    request_id: UUID,
    data: ResourceDeletionDecision,
    db: AsyncSession = Depends(get_db),
):
    """Admin approves or rejects a resource deletion request."""
    try:
        # Phase 6: decided_by comes from session/auth middleware.
        # Placeholder: using a system UUID until auth middleware is wired.
        decided_by = UUID("00000000-0000-0000-0000-000000000001")
        request = await ResourceDeletionService.decide_deletion_request(
            db, request_id, data.status, decided_by
        )
        return request
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))

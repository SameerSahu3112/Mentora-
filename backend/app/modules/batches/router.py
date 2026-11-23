"""Batch domain routes.

Phase 3: Courses, batches, teacher assignment
- Public: GET /public/batches, GET /public/batches/{batch_id}
- Admin: POST /admin/batches, PUT /admin/batches/{batch_id}, DELETE /admin/batches/{batch_id}
- Teacher assignment: POST /admin/batches/{batch_id}/teachers, DELETE /admin/batches/{batch_id}/teachers/{teacher_id}
- Capacity: GET /public/batches/{batch_id}/capacity
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.permissions import require_admin
from app.modules.auth.models import User
from app.modules.batches.models import Batch, BatchTeacher
from app.modules.batches.schemas import (
    BatchCreate,
    BatchUpdate,
    BatchResponse,
    BatchPublic,
    BatchTeacherAssign,
    BatchTeacherResponse,
    BatchCapacityInfo,
)
from app.modules.batches.service import BatchService
from app.modules.courses.models import Course

router = APIRouter(prefix="/batches", tags=["batches"])


# ---------------------------------------------------------------------------
# Public routes (no authentication required)
# ---------------------------------------------------------------------------

@router.get("/", response_model=list[BatchPublic])
async def list_public_batches(
    db: AsyncSession = Depends(get_db),
    course_id: UUID | None = Query(None),
    active_only: bool = Query(True),
):
    """List all batches publicly (no login required)."""
    batches = await BatchService.list_batches(db, course_id=course_id, active_only=active_only)
    # Enrich with course name
    results = []
    for batch in batches:
        course = await db.execute(
            Course.__table__.select().where(Course.id == batch.course_id)  # type: ignore[attr-defined]
        )
        course_row = course.mappings().first()
        results.append(
            BatchPublic(
                id=str(batch.id),
                course_id=batch.course_id,
                name=batch.name,
                description=batch.description,
                start_date=batch.start_date,
                end_date=batch.end_date,
                max_capacity=batch.max_capacity,
                status=batch.status,
                course_name=course_row["name"] if course_row else "",
            )
        )
    return results


@router.get("/{batch_id}", response_model=BatchPublic)
async def get_public_batch(
    batch_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a single batch publicly (no login required)."""
    batch = await BatchService.get_batch(db, batch_id)
    if batch is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Batch not found")
    course = await db.execute(
        Course.__table__.select().where(Course.id == batch.course_id)  # type: ignore[attr-defined]
    )
    course_row = course.mappings().first()
    return BatchPublic(
        id=str(batch.id),
        course_id=batch.course_id,
        name=batch.name,
        description=batch.description,
        start_date=batch.start_date,
        end_date=batch.end_date,
        max_capacity=batch.max_capacity,
        status=batch.status,
        course_name=course_row["name"] if course_row else "",
    )


@router.get("/{batch_id}/capacity", response_model=BatchCapacityInfo)
async def get_batch_capacity(
    batch_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get capacity info for a batch (public)."""
    return await BatchService.get_capacity_info(db, batch_id)


# ---------------------------------------------------------------------------
# Admin routes (require admin role — enforced in Phase 2 middleware)
# ---------------------------------------------------------------------------

@router.post("/", response_model=BatchResponse, status_code=status.HTTP_201_CREATED)
async def admin_create_batch(
    data: BatchCreate,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: create a new batch."""
    try:
        batch = await BatchService.create_batch(db, data)
        return batch
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc))


@router.put("/{batch_id}", response_model=BatchResponse)
async def admin_update_batch(
    batch_id: UUID,
    data: BatchUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: update batch details."""
    batch = await BatchService.get_batch(db, batch_id)
    if batch is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Batch not found")
    return await BatchService.update_batch(db, batch, data)


@router.delete("/{batch_id}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_batch(
    batch_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: delete a batch (critical action — two-Admin approval in Phase 8)."""
    batch = await BatchService.get_batch(db, batch_id)
    if batch is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Batch not found")
    await BatchService.delete_batch(db, batch)


# ---------------------------------------------------------------------------
# Teacher assignment (Admin only)
# ---------------------------------------------------------------------------

@router.post("/{batch_id}/teachers", response_model=BatchTeacherResponse)
async def admin_assign_teacher(
    batch_id: UUID,
    data: BatchTeacherAssign,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: assign a teacher to a batch."""
    batch = await BatchService.get_batch(db, batch_id)
    if batch is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Batch not found")
    try:
        assignment = await BatchService.assign_teacher(
            db, batch, data.teacher_profile_id
        )
        return assignment
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc))


@router.delete("/{batch_id}/teachers/{teacher_profile_id}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_remove_teacher(
    batch_id: UUID,
    teacher_profile_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: remove a teacher from a batch (critical action — two-Admin approval in Phase 8)."""
    batch = await BatchService.get_batch(db, batch_id)
    if batch is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Batch not found")
    try:
        await BatchService.remove_teacher(db, batch, teacher_profile_id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc))


@router.get("/{batch_id}/teachers", response_model=list[BatchTeacherResponse])
async def list_batch_teachers(
    batch_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """List teachers assigned to a batch (public)."""
    batch = await BatchService.get_batch(db, batch_id)
    if batch is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Batch not found")
    assignments = await BatchService.list_batch_teachers(db, batch_id)
    return assignments

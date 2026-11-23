"""Course domain routes.

Phase 3: Courses, batches, teacher assignment
- Public: GET /public/courses, GET /public/courses/{course_id}
- Admin: POST /admin/courses, PUT /admin/courses/{course_id}, DELETE /admin/courses/{course_id}
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.permissions import require_admin
from app.modules.auth.models import User
from app.modules.courses.models import Course
from app.modules.courses.schemas import (
    CourseCreate,
    CourseUpdate,
    CourseResponse,
    CoursePublic,
    CourseWithBatches,
    CourseBatchSummary,
)
from app.modules.courses.service import CourseService
from app.modules.batches.models import Batch

router = APIRouter(prefix="/courses", tags=["courses"])


# ---------------------------------------------------------------------------
# Public routes (no authentication required)
# ---------------------------------------------------------------------------

@router.get("/", response_model=list[CoursePublic])
async def list_public_courses(
    db: AsyncSession = Depends(get_db),
    active_only: bool = Query(True),
):
    """List all courses publicly (no login required)."""
    courses = await CourseService.list_courses(db, active_only=active_only)
    return courses


@router.get("/{course_id}", response_model=CoursePublic)
async def get_public_course(
    course_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a single course publicly (no login required)."""
    course = await CourseService.get_course(db, course_id)
    if course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    return course


@router.get("/{course_id}/with-batches", response_model=CourseWithBatches)
async def get_course_with_batches(
    course_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a course with its batches (public)."""
    course = await CourseService.get_course(db, course_id)
    if course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    batches = await db.execute(
        Batch.__table__.select().where(Batch.course_id == course_id)  # type: ignore[attr-defined]
    )
    batch_rows = batches.mappings().all()

    return CourseWithBatches(
        id=str(course.id),
        name=course.name,
        exam_target=course.exam_target,
        exam_date=course.exam_date,
        price=float(course.price) if course.price else 0.0,
        description=course.description,
        is_active=course.is_active,
        created_at=course.created_at,
        updated_at=course.updated_at,
        batches=[
            CourseBatchSummary(
                id=str(row["id"]),
                name=row["name"],
                status=row["status"],
                max_capacity=row["max_capacity"],
                start_date=row["start_date"],
                end_date=row["end_date"],
            )
            for row in batch_rows
        ],
    )


# ---------------------------------------------------------------------------
# Admin routes (require admin role — enforced in Phase 2 middleware)
# ---------------------------------------------------------------------------

@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def admin_create_course(
    data: CourseCreate,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: create a new course."""
    try:
        course = await CourseService.create_course(db, data)
        return course
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc))


@router.put("/{course_id}", response_model=CourseResponse)
async def admin_update_course(
    course_id: UUID,
    data: CourseUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: update a course (name, exam_target, exam_date, price, etc.).

    Price changes do not alter already-quoted prices for existing
    applications/enrollments (handled at application/enrollment level).
    """
    course = await CourseService.get_course(db, course_id)
    if course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    return await CourseService.update_course(db, course, data)


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_course(
    course_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    """Admin: delete a course (critical action — two-Admin approval in Phase 8)."""
    course = await CourseService.get_course(db, course_id)
    if course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    await CourseService.delete_course(db, course)

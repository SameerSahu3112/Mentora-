"""Batch service layer.

Phase 3: Courses, batches, teacher assignment
- Batch CRUD
- Teacher assignment (many-to-many)
- Concurrency-safe capacity calculation and reservation
"""

from uuid import UUID
from datetime import date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update
from sqlalchemy.dialects.postgresql import insert

from app.modules.batches.models import Batch, BatchTeacher
from app.modules.courses.models import Course
from app.modules.batches.schemas import BatchCreate, BatchUpdate, BatchCapacityInfo
from app.modules.auth.models import User


class BatchService:
    """Business logic for batches and capacity."""

    @staticmethod
    async def create_batch(db: AsyncSession, data: BatchCreate) -> Batch:
        """Create a new batch. Course must exist."""
        # Verify course exists
        course = await db.execute(
            select(Course).where(Course.id == data.course_id)
        )
        if course.scalar_one_or_none() is None:
            raise ValueError(f"Course '{data.course_id}' not found")

        batch = Batch(
            course_id=data.course_id,
            name=data.name,
            description=data.description,
            start_date=data.start_date,
            end_date=data.end_date,
            weekly_schedule=data.weekly_schedule,
            max_capacity=data.max_capacity,
            status=data.status,
        )
        db.add(batch)
        await db.commit()
        await db.refresh(batch)
        return batch

    @staticmethod
    async def get_batch(db: AsyncSession, batch_id: UUID) -> Batch | None:
        """Get a batch by ID."""
        result = await db.execute(select(Batch).where(Batch.id == batch_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def list_batches(
        db: AsyncSession, course_id: UUID | None = None, active_only: bool = False
    ) -> list[Batch]:
        """List batches, optionally filtered by course and active status."""
        query = select(Batch)
        if course_id is not None:
            query = query.where(Batch.course_id == course_id)
        if active_only:
            query = query.where(Batch.status == "active")
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def update_batch(
        db: AsyncSession, batch: Batch, data: BatchUpdate
    ) -> Batch:
        """Update batch details."""
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(batch, field, value)
        await db.commit()
        await db.refresh(batch)
        return batch

    @staticmethod
    async def delete_batch(db: AsyncSession, batch: Batch) -> None:
        """Delete a batch (critical action — two-Admin approval in Phase 8)."""
        await db.delete(batch)
        await db.commit()

    @staticmethod
    async def assign_teacher(
        db: AsyncSession, batch: Batch, teacher_profile_id: UUID, assigned_by: UUID | None = None
    ) -> BatchTeacher:
        """Assign a teacher to a batch (many-to-many)."""
        # Check if already assigned
        existing = await db.execute(
            select(BatchTeacher).where(
                BatchTeacher.batch_id == batch.id,
                BatchTeacher.teacher_profile_id == teacher_profile_id,
            )
        )
        if existing.scalar_one_or_none():
            raise ValueError("Teacher already assigned to this batch")

        assignment = BatchTeacher(
            batch_id=batch.id,
            teacher_profile_id=teacher_profile_id,
            assigned_by=assigned_by,
        )
        db.add(assignment)
        await db.commit()
        await db.refresh(assignment)
        return assignment

    @staticmethod
    async def remove_teacher(db: AsyncSession, batch: Batch, teacher_profile_id: UUID) -> None:
        """Remove a teacher from a batch (critical action — two-Admin approval in Phase 8)."""
        result = await db.execute(
            select(BatchTeacher).where(
                BatchTeacher.batch_id == batch.id,
                BatchTeacher.teacher_profile_id == teacher_profile_id,
            )
        )
        assignment = result.scalar_one_or_none()
        if assignment is None:
            raise ValueError("Teacher not assigned to this batch")
        await db.delete(assignment)
        await db.commit()

    @staticmethod
    async def list_batch_teachers(db: AsyncSession, batch_id: UUID) -> list[BatchTeacher]:
        """List teachers assigned to a batch."""
        result = await db.execute(
            select(BatchTeacher).where(BatchTeacher.batch_id == batch_id)
        )
        return result.scalars().all()

    @staticmethod
    async def get_capacity_info(db: AsyncSession, batch_id: UUID) -> BatchCapacityInfo:
        """Get capacity info for a batch (read-only, no lock)."""
        batch = await BatchService.get_batch(db, batch_id)
        if batch is None:
            raise ValueError(f"Batch '{batch_id}' not found")

        # Count reserved seats: pending_payment + active enrollments
        # (Enrollment model created in Phase 5; use raw count placeholder here)
        # For now, reserved_seats = 0 until enrollments exist in Phase 5
        reserved_seats = 0
        available_seats = batch.max_capacity - reserved_seats
        is_full = available_seats <= 0

        return BatchCapacityInfo(
            batch_id=str(batch.id),
            name=batch.name,
            max_capacity=batch.max_capacity,
            reserved_seats=reserved_seats,
            available_seats=available_seats,
            is_full=is_full,
        )

    @staticmethod
    async def reserve_seat_concurrent(
        db: AsyncSession, batch_id: UUID
    ) -> bool:
        """Concurrency-safe seat reservation using PostgreSQL row-level locking.

        Uses SELECT ... FOR UPDATE to lock the batch row, checks capacity,
        and marks the batch as full when no seats remain.

        Phase 3: counts reserved seats as 0 (enrollments integrated in Phase 5).
        The batch status field tracks full/closed state. When enrollments exist
        (Phase 5), this query joins Enrollment to count pending_payment + active.

        Returns True if a seat is available, False if the batch is full.
        Caller must commit or rollback the transaction.
        """
        # Lock the batch row for update
        result = await db.execute(
            select(Batch).where(Batch.id == batch_id).with_for_update()
        )
        batch = result.scalar_one_or_none()
        if batch is None:
            raise ValueError(f"Batch '{batch_id}' not found")

        if batch.status != "active":
            return False

        # Phase 3: no enrollments yet, so reserved_seats = 0.
        # Phase 5 will integrate: count Enrollment rows with status in
        # (pending_payment, active) for this batch.
        reserved_seats = 0

        if reserved_seats >= batch.max_capacity:
            batch.status = "full"
            await db.commit()
            return False

        return True

    @staticmethod
    async def release_seat(
        db: AsyncSession, batch_id: UUID
    ) -> None:
        """Release a reserved seat when an application/enrollment is rejected
        or cancelled. If the batch was marked full, set it back to active.

        Phase 3 placeholder — full integration with enrollment status changes
        happens in Phase 5.
        """
        batch = await BatchService.get_batch(db, batch_id)
        if batch is None:
            raise ValueError(f"Batch '{batch_id}' not found")
        if batch.status == "full":
            batch.status = "active"
            await db.commit()

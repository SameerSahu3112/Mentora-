"""Enrollment, payment, and transfer service layer.

Phase 5: Payments and enrollment
- Manual payment record by Admin
- Enrollment lifecycle (PENDING_PAYMENT -> ACTIVE -> EXPIRED/CANCELLED/REJECTED)
- Admin activation workflow
- Enrollment expiry (exam_date + 7 days)
- Batch transfer request workflow
"""

from uuid import UUID
from datetime import date, datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.modules.enrollments.models import Enrollment, Payment, BatchTransferRequest
from app.modules.enrollments.schemas import (
    EnrollmentCreate,
    PaymentRecordRequest,
    BatchTransferRequestCreate,
)
from app.modules.batches.service import BatchService


class EnrollmentService:
    """Business logic for enrollments."""

    @staticmethod
    async def create_enrollment(
        db: AsyncSession, data: EnrollmentCreate
    ) -> Enrollment:
        """Create a new enrollment (PENDING_PAYMENT by default).

        Links to an optional application. Does not activate — activation
        requires Admin payment verification.
        """
        enrollment = Enrollment(
            student_profile_id=UUID(data.student_profile_id),
            course_id=UUID(data.course_id),
            batch_id=UUID(data.batch_id),
            application_id=UUID(data.application_id) if data.application_id else None,
            status=data.status,
            access_until=data.access_until,
        )
        db.add(enrollment)
        try:
            await db.commit()
            await db.refresh(enrollment)
            return enrollment
        except IntegrityError:
            await db.rollback()
            raise ValueError("Enrollment could not be created")

    @staticmethod
    async def get_enrollment(db: AsyncSession, enrollment_id: UUID) -> Enrollment | None:
        """Get an enrollment by ID."""
        result = await db.execute(
            select(Enrollment).where(Enrollment.id == enrollment_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_student_enrollments(
        db: AsyncSession, student_profile_id: UUID
    ) -> list[Enrollment]:
        """List all enrollments for a student (includes expired history)."""
        result = await db.execute(
            select(Enrollment).where(
                Enrollment.student_profile_id == student_profile_id
            )
        )
        return result.scalars().all()

    @staticmethod
    async def list_all_enrollments(db: AsyncSession) -> list[Enrollment]:
        """Admin: list all enrollments."""
        result = await db.execute(select(Enrollment))
        return result.scalars().all()

    @staticmethod
    async def activate_enrollment(
        db: AsyncSession,
        enrollment_id: UUID,
        activated_by: UUID,
    ) -> Enrollment:
        """Admin activates an enrollment after manual payment verification.

        Sets status to ACTIVE and records activated_at / activated_by.
        """
        enrollment = await EnrollmentService.get_enrollment(db, enrollment_id)
        if enrollment is None:
            raise ValueError("Enrollment not found")
        if enrollment.status != "pending_payment":
            raise ValueError(f"Enrollment is in '{enrollment.status}' state, cannot activate")

        enrollment.status = "active"
        enrollment.activated_at = datetime.now(timezone.utc)
        enrollment.activated_by = activated_by
        await db.commit()
        await db.refresh(enrollment)
        return enrollment

    @staticmethod
    async def reject_enrollment(
        db: AsyncSession,
        enrollment_id: UUID,
    ) -> Enrollment:
        """Admin rejects an enrollment (critical action — two-Admin approval).

        Releases the reserved seat.
        """
        enrollment = await EnrollmentService.get_enrollment(db, enrollment_id)
        if enrollment is None:
            raise ValueError("Enrollment not found")
        enrollment.status = "rejected"
        await db.commit()
        await db.refresh(enrollment)

        # Release seat
        await BatchService.release_seat(db, enrollment.batch_id)
        return enrollment

    @staticmethod
    async def cancel_enrollment(
        db: AsyncSession,
        enrollment_id: UUID,
    ) -> Enrollment:
        """Admin cancels an enrollment (critical action — two-Admin approval).

        Releases the reserved seat.
        """
        enrollment = await EnrollmentService.get_enrollment(db, enrollment_id)
        if enrollment is None:
            raise ValueError("Enrollment not found")
        enrollment.status = "cancelled"
        await db.commit()
        await db.refresh(enrollment)

        # Release seat
        await BatchService.release_seat(db, enrollment.batch_id)
        return enrollment

    @staticmethod
    async def expire_enrollments(
        db: AsyncSession,
    ) -> list[Enrollment]:
        """Expire enrollments where access_until has passed.

        Called by a scheduled service. Sets status to EXPIRED for
        active enrollments past their access_until date.
        Student account and history are preserved.
        """
        today = date.today()
        result = await db.execute(
            select(Enrollment).where(
                Enrollment.status == "active",
                Enrollment.access_until < today,
            )
        )
        expired = result.scalars().all()
        for enrollment in expired:
            enrollment.status = "expired"
        await db.commit()
        return expired

    @staticmethod
    async def check_enrollment_access(
        db: AsyncSession,
        student_profile_id: UUID,
        course_id: UUID,
        batch_id: UUID | None = None,
    ) -> bool:
        """Check if a student has active enrollment access to a course/batch.

        Returns True if the student has an ACTIVE enrollment covering the
        course (and optionally batch) that has not expired.
        """
        today = date.today()
        query = select(Enrollment).where(
            Enrollment.student_profile_id == student_profile_id,
            Enrollment.course_id == course_id,
            Enrollment.status == "active",
            Enrollment.access_until >= today,
        )
        if batch_id is not None:
            query = query.where(Enrollment.batch_id == batch_id)
        result = await db.execute(query)
        return result.scalar_one_or_none() is not None


class PaymentService:
    """Business logic for manual payments."""

    @staticmethod
    async def record_payment_admin(
        db: AsyncSession,
        student_profile_id: UUID,
        course_id: UUID,
        batch_id: UUID,
        original_amount: float,
        discount: float,
        final_amount: float,
        payment_date: date,
        payment_method: str | None,
        transaction_reference: str | None,
        recorded_by: UUID,
    ) -> Payment:
        """Admin records a manual payment with explicit UUID parameters.

        Routine operation — one Admin. Does not activate enrollment;
        that is a separate step.
        """
        payment = Payment(
            student_profile_id=student_profile_id,
            course_id=course_id,
            batch_id=batch_id,
            original_amount=original_amount,
            discount=discount,
            final_amount=final_amount,
            status="recorded",
            payment_date=payment_date,
            payment_method=payment_method,
            transaction_reference=transaction_reference,
            recorded_by=recorded_by,
        )
        db.add(payment)
        await db.commit()
        await db.refresh(payment)
        return payment

    @staticmethod
    async def get_payment(db: AsyncSession, payment_id: UUID) -> Payment | None:
        """Get a payment by ID."""
        result = await db.execute(select(Payment).where(Payment.id == payment_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def list_student_payments(
        db: AsyncSession, student_profile_id: UUID
    ) -> list[Payment]:
        """List all payments for a student."""
        result = await db.execute(
            select(Payment).where(Payment.student_profile_id == student_profile_id)
        )
        return result.scalars().all()

    @staticmethod
    async def list_all_payments(db: AsyncSession) -> list[Payment]:
        """Admin: list all payments."""
        result = await db.execute(select(Payment))
        return result.scalars().all()

    @staticmethod
    async def verify_payment(
        db: AsyncSession, payment_id: UUID
    ) -> Payment:
        """Admin verifies a recorded payment (routine — one Admin)."""
        payment = await PaymentService.get_payment(db, payment_id)
        if payment is None:
            raise ValueError("Payment not found")
        payment.status = "verified"
        await db.commit()
        await db.refresh(payment)
        return payment


class BatchTransferService:
    """Business logic for batch transfer requests."""

    @staticmethod
    async def create_transfer_request(
        db: AsyncSession, data: BatchTransferRequestCreate
    ) -> BatchTransferRequest:
        """Student requests a batch transfer.

        Admin handles manually. Record reason, original batch, requested batch.
        """
        transfer = BatchTransferRequest(
            student_profile_id=UUID(data.student_profile_id),
            original_batch_id=UUID(data.original_batch_id),
            requested_batch_id=UUID(data.requested_batch_id),
            enrollment_id=UUID(data.enrollment_id),
            reason=data.reason,
            status="pending",
        )
        db.add(transfer)
        try:
            await db.commit()
            await db.refresh(transfer)
            return transfer
        except IntegrityError:
            await db.rollback()
            raise ValueError("Transfer request could not be created")

    @staticmethod
    async def get_transfer_request(
        db: AsyncSession, transfer_id: UUID
    ) -> BatchTransferRequest | None:
        """Get a transfer request by ID."""
        result = await db.execute(
            select(BatchTransferRequest).where(BatchTransferRequest.id == transfer_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_transfer_requests(db: AsyncSession) -> list[BatchTransferRequest]:
        """Admin: list all transfer requests."""
        result = await db.execute(select(BatchTransferRequest))
        return result.scalars().all()

    @staticmethod
    async def decide_transfer_request(
        db: AsyncSession,
        transfer_id: UUID,
        status: str,
        decision_by: UUID,
        decision_notes: str | None = None,
    ) -> BatchTransferRequest:
        """Admin approves or rejects a batch transfer request.

        If approved, the student's enrollment is moved to the requested batch
        (seat handling done by the caller/enrollment service).
        """
        transfer = await BatchTransferService.get_transfer_request(db, transfer_id)
        if transfer is None:
            raise ValueError("Transfer request not found")

        allowed = {"approved", "rejected", "cancelled"}
        if status not in allowed:
            raise ValueError(f"Status must be one of {allowed}")

        transfer.status = status
        transfer.decision_by = decision_by
        transfer.decision_at = datetime.now(timezone.utc)
        transfer.decision_notes = decision_notes

        await db.commit()
        await db.refresh(transfer)
        return transfer

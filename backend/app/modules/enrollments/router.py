"""Enrollment, payment, and transfer routes.

Phase 5: Payments and enrollment
- Student: GET /student/enrollments, GET /student/enrollments/{id}
- Admin: GET /admin/enrollments, GET /admin/enrollments/{id}, POST /admin/enrollments/activate
- Admin: POST /admin/payments, GET /admin/payments, PUT /admin/payments/{id}/verify
- Admin: POST /admin/batch-transfer-requests, GET /admin/batch-transfer-requests, PATCH /admin/batch-transfer-requests/{id}/decide
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import date

from app.core.database import get_db
from app.modules.enrollments.models import Enrollment, Payment, BatchTransferRequest
from app.modules.enrollments.schemas import (
    EnrollmentResponse,
    EnrollmentActivateRequest,
    PaymentResponse,
    PaymentRecordRequest,
    BatchTransferRequestResponse,
    BatchTransferRequestCreate,
    BatchTransferDecisionRequest,
)
from app.modules.enrollments.service import (
    EnrollmentService,
    PaymentService,
    BatchTransferService,
)

router = APIRouter(prefix="/enrollments", tags=["enrollments"])


# ---------------------------------------------------------------------------
# Student routes
# ---------------------------------------------------------------------------

@router.get("/student/enrollments", response_model=list[EnrollmentResponse])
async def student_list_enrollments(
    db: AsyncSession = Depends(get_db),
):
    """List the current student's enrollments (includes expired history)."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


@router.get("/student/enrollments/{enrollment_id}", response_model=EnrollmentResponse)
async def student_get_enrollment(
    enrollment_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a single enrollment detail."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Session-based student identification pending auth middleware",
    )


# ---------------------------------------------------------------------------
# Admin enrollment routes
# ---------------------------------------------------------------------------

@router.get("/admin/enrollments", response_model=list[EnrollmentResponse])
async def admin_list_enrollments(
    db: AsyncSession = Depends(get_db),
):
    """Admin: list all enrollments."""
    return await EnrollmentService.list_all_enrollments(db)


@router.get("/admin/enrollments/{enrollment_id}", response_model=EnrollmentResponse)
async def admin_get_enrollment(
    enrollment_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Admin: get enrollment detail."""
    enrollment = await EnrollmentService.get_enrollment(db, enrollment_id)
    if enrollment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
    return enrollment


@router.post("/admin/enrollments/activate", response_model=EnrollmentResponse)
async def admin_activate_enrollment(
    data: EnrollmentActivateRequest,
    db: AsyncSession = Depends(get_db),
):
    """Admin activates an enrollment after manual payment verification.

    Routine operation — one Admin.
    """
    try:
        enrollment = await EnrollmentService.activate_enrollment(
            db, UUID(data.enrollment_id), UUID(data.activated_by)
        )
        return enrollment
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.post("/admin/enrollments/{enrollment_id}/reject", response_model=EnrollmentResponse)
async def admin_reject_enrollment(
    enrollment_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Admin rejects an enrollment (critical action — two-Admin approval, Phase 8)."""
    try:
        enrollment = await EnrollmentService.reject_enrollment(db, enrollment_id)
        return enrollment
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))


@router.post("/admin/enrollments/{enrollment_id}/cancel", response_model=EnrollmentResponse)
async def admin_cancel_enrollment(
    enrollment_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Admin cancels an enrollment (critical action — two-Admin approval, Phase 8)."""
    try:
        enrollment = await EnrollmentService.cancel_enrollment(db, enrollment_id)
        return enrollment
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))


# ---------------------------------------------------------------------------
# Admin payment routes
# ---------------------------------------------------------------------------

@router.post("/admin/payments", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
async def admin_record_payment(
    data: PaymentRecordRequest,
    db: AsyncSession = Depends(get_db),
):
    """Admin records a manual payment (routine — one Admin).

    No payment gateway in v1. Payment is handled outside the platform.
    """
    try:
        payment = await PaymentService.record_payment_admin(
            db,
            student_profile_id=UUID(data.student_profile_id),
            course_id=UUID(data.course_id),
            batch_id=UUID(data.batch_id),
            original_amount=data.original_amount,
            discount=data.discount,
            final_amount=data.final_amount,
            payment_date=data.payment_date,
            payment_method=data.payment_method,
            transaction_reference=data.transaction_reference,
            recorded_by=UUID(data.recorded_by),
        )
        return payment
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.get("/admin/payments", response_model=list[PaymentResponse])
async def admin_list_payments(
    db: AsyncSession = Depends(get_db),
):
    """Admin: list all payments."""
    return await PaymentService.list_all_payments(db)


@router.put("/admin/payments/{payment_id}/verify", response_model=PaymentResponse)
async def admin_verify_payment(
    payment_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Admin verifies a recorded payment (routine — one Admin)."""
    try:
        payment = await PaymentService.verify_payment(db, payment_id)
        return payment
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))


# ---------------------------------------------------------------------------
# Admin batch transfer request routes
# ---------------------------------------------------------------------------

@router.post(
    "/admin/batch-transfer-requests",
    response_model=BatchTransferRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
async def admin_create_transfer_request(
    data: BatchTransferRequestCreate,
    db: AsyncSession = Depends(get_db),
):
    """Admin: create a batch transfer request (typically on behalf of student)."""
    try:
        transfer = await BatchTransferService.create_transfer_request(db, data)
        return transfer
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.get("/admin/batch-transfer-requests", response_model=list[BatchTransferRequestResponse])
async def admin_list_transfer_requests(
    db: AsyncSession = Depends(get_db),
):
    """Admin: list all batch transfer requests."""
    return await BatchTransferService.list_transfer_requests(db)


@router.patch(
    "/admin/batch-transfer-requests/{transfer_id}/decide",
    response_model=BatchTransferRequestResponse,
)
async def admin_decide_transfer_request(
    transfer_id: UUID,
    data: BatchTransferDecisionRequest,
    db: AsyncSession = Depends(get_db),
):
    """Admin approves or rejects a batch transfer request.

    Approving is a critical action (two-Admin approval, Phase 8).
    """
    try:
        # Phase 5: decision_by comes from session/auth middleware.
        # Placeholder: using a system UUID until auth middleware is wired.
        decision_by = UUID("00000000-0000-0000-0000-000000000001")
        transfer = await BatchTransferService.decide_transfer_request(
            db, transfer_id, data.status, decision_by, data.decision_notes
        )
        return transfer
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))

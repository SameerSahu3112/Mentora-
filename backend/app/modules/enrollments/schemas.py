"""Enrollment domain Pydantic schemas.

Phase 5: Payments and enrollment
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime
from uuid import UUID


class EnrollmentBase(BaseModel):
    student_profile_id: str
    course_id: str
    batch_id: str
    status: str = "pending_payment"
    access_until: date


class EnrollmentCreate(EnrollmentBase):
    application_id: Optional[str] = None


class EnrollmentUpdate(BaseModel):
    status: Optional[str] = None
    access_until: Optional[date] = None


class EnrollmentResponse(EnrollmentBase):
    id: str
    application_id: Optional[str] = None
    activated_at: Optional[datetime] = None
    activated_by: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class EnrollmentActivateRequest(BaseModel):
    """Admin activates an enrollment after payment verification."""

    enrollment_id: str
    activated_by: str


class PaymentBase(BaseModel):
    student_profile_id: str
    course_id: str
    batch_id: str
    original_amount: float = Field(..., ge=0)
    discount: float = Field(0, ge=0)
    final_amount: float = Field(..., ge=0)
    payment_date: date
    payment_method: Optional[str] = None
    transaction_reference: Optional[str] = None


class PaymentCreate(PaymentBase):
    recorded_by: str


class PaymentUpdate(BaseModel):
    status: Optional[str] = None
    payment_method: Optional[str] = None
    transaction_reference: Optional[str] = None


class PaymentResponse(PaymentBase):
    id: str
    enrollment_id: Optional[str] = None
    status: str
    recorded_by: str
    recorded_at: datetime

    class Config:
        from_attributes = True


class PaymentRecordRequest(BaseModel):
    """Admin records a manual payment."""

    student_profile_id: str
    course_id: str
    batch_id: str
    original_amount: float = Field(..., ge=0)
    discount: float = Field(0, ge=0)
    final_amount: float = Field(..., ge=0)
    payment_date: date
    payment_method: Optional[str] = None
    transaction_reference: Optional[str] = None


class BatchTransferRequestBase(BaseModel):
    student_profile_id: str
    original_batch_id: str
    requested_batch_id: str
    enrollment_id: str
    reason: str = Field(..., min_length=1)


class BatchTransferRequestCreate(BatchTransferRequestBase):
    pass


class BatchTransferRequestResponse(BatchTransferRequestBase):
    id: str
    status: str
    decision_by: Optional[str] = None
    decision_at: Optional[datetime] = None
    decision_notes: Optional[str] = None
    requested_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BatchTransferDecisionRequest(BaseModel):
    """Admin approves or rejects a batch transfer request."""

    status: str = Field(..., description="approved or rejected")
    decision_notes: Optional[str] = None

"""Enrollment domain models.

Phase 5: Payments and enrollment
- enrollments: enrollment lifecycle (PENDING_PAYMENT -> ACTIVE -> EXPIRED/CANCELLED/REJECTED)
- payments: manual payment record by Admin
- batch_transfer_requests: student-initiated batch transfer
"""

import uuid
from datetime import date
from sqlalchemy import (
    Column, String, DateTime, ForeignKey, CheckConstraint,
    UniqueConstraint, Numeric, Date,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Enrollment(Base):
    """Enrollment lifecycle entity.

    States: PENDING_PAYMENT -> ACTIVE -> EXPIRED/CANCELLED/REJECTED
    Expires at exam_date + 7 days (access_until).
    """

    __tablename__ = "enrollments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("student_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    course_id = Column(
        UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False
    )
    batch_id = Column(
        UUID(as_uuid=True), ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    application_id = Column(
        UUID(as_uuid=True),
        ForeignKey("batch_applications.id", ondelete="SET NULL"),
        nullable=True,
        unique=True,
    )
    status = Column(String(32), nullable=False, default="pending_payment")
    access_until = Column(Date, nullable=False)
    activated_at = Column(DateTime(timezone=True), nullable=True)
    activated_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    student_profile = relationship("StudentProfile", backref="enrollments")
    course = relationship("Course", backref="enrollments")
    batch = relationship("Batch", backref="enrollments")
    application = relationship("BatchApplication", backref="enrollment", uselist=False)

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending_payment', 'active', 'expired', 'cancelled', 'rejected')",
            name="chk_enrollments_status",
        ),
    )


class Payment(Base):
    """Manual payment record by Admin.

    No payment gateway in v1 — payment is handled outside the platform.
    """

    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("student_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    course_id = Column(
        UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False
    )
    batch_id = Column(
        UUID(as_uuid=True), ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    enrollment_id = Column(
        UUID(as_uuid=True),
        ForeignKey("enrollments.id", ondelete="SET NULL"),
        nullable=True,
    )
    original_amount = Column(Numeric(10, 2), nullable=False)
    discount = Column(Numeric(10, 2), nullable=False, default=0)
    final_amount = Column(Numeric(10, 2), nullable=False)
    status = Column(String(32), nullable=False, default="recorded")
    payment_date = Column(Date, nullable=False)
    payment_method = Column(String(64), nullable=True)
    transaction_reference = Column(String(255), nullable=True)
    recorded_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=False
    )
    recorded_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    student_profile = relationship("StudentProfile", backref="payments")
    course = relationship("Course", backref="payments")
    batch = relationship("Batch", backref="payments")
    enrollment = relationship("Enrollment", backref="payment", uselist=False)

    __table_args__ = (
        CheckConstraint(
            "status IN ('recorded', 'verified', 'failed', 'refunded')",
            name="chk_payments_status",
        ),
    )


class BatchTransferRequest(Base):
    """Student-initiated batch transfer request.

    Admin handles manually. Record reason, original batch, requested batch,
    decision, responsible Admin, timestamps.
    """

    __tablename__ = "batch_transfer_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("student_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    original_batch_id = Column(
        UUID(as_uuid=True), ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    requested_batch_id = Column(
        UUID(as_uuid=True), ForeignKey("batches.id", ondelete="CASCADE"), nullable=False
    )
    enrollment_id = Column(
        UUID(as_uuid=True), ForeignKey("enrollments.id", ondelete="CASCADE"), nullable=False
    )
    reason = Column(String(1000), nullable=False)
    status = Column(String(32), nullable=False, default="pending")
    decision_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    decision_at = Column(DateTime(timezone=True), nullable=True)
    decision_notes = Column(String(1000), nullable=True)
    requested_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    student_profile = relationship("StudentProfile", backref="transfer_requests")
    original_batch = relationship("Batch", foreign_keys=[original_batch_id], backref="original_transfer_requests")
    requested_batch = relationship("Batch", foreign_keys=[requested_batch_id], backref="requested_transfer_requests")
    enrollment = relationship("Enrollment", backref="transfer_requests")

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending', 'approved', 'rejected', 'cancelled')",
            name="chk_batch_transfer_requests_status",
        ),
    )

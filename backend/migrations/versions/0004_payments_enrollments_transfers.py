"""Payments, enrollments, and batch transfer requests

Revision ID: 0004_payments_enrollments_transfers
Revises: 0003_applications_intro_sessions_notifications
Create Date: 2026-11-19 23:55:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0004_payments_enrollments_transfers"
down_revision: Union[str, None] = "0003_applications_intro_sessions_notifications"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # enrollments table
    op.create_table(
        "enrollments",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("student_profile_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("course_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("batch_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("application_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("status", sa.String(length=32), nullable=False, server_default=sa.text("'pending_payment'::character varying")),
        sa.Column("access_until", sa.Date(), nullable=False),
        sa.Column("activated_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("activated_by", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "status IN ('pending_payment', 'active', 'expired', 'cancelled', 'rejected')",
            name="chk_enrollments_status",
        ),
        sa.ForeignKeyConstraint(["application_id"], ["batch_applications.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["batch_id"], ["batches.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["course_id"], ["courses.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["student_profile_id"], ["student_profiles.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(["activated_by"], ["users.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("application_id", name="uq_enrollments_application_id"),
    )
    op.create_index(op.f("ix_enrollments_student_profile_id"), "enrollments", ["student_profile_id"])
    op.create_index(op.f("ix_enrollments_batch_id"), "enrollments", ["batch_id"])
    op.create_index(op.f("ix_enrollments_status"), "enrollments", ["status"])
    op.create_index(op.f("ix_enrollments_access_until"), "enrollments", ["access_until"])

    # payments table
    op.create_table(
        "payments",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("student_profile_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("course_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("batch_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("enrollment_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("original_amount", sa.Numeric(precision=10, scale=2), nullable=False),
        sa.Column("discount", sa.Numeric(precision=10, scale=2), nullable=False, server_default=sa.text("0")),
        sa.Column("final_amount", sa.Numeric(precision=10, scale=2), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default=sa.text("'recorded'::character varying")),
        sa.Column("payment_date", sa.Date(), nullable=False),
        sa.Column("payment_method", sa.String(length=64), nullable=True),
        sa.Column("transaction_reference", sa.String(length=255), nullable=True),
        sa.Column("recorded_by", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("recorded_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "status IN ('recorded', 'verified', 'failed', 'refunded')",
            name="chk_payments_status",
        ),
        sa.ForeignKeyConstraint(["batch_id"], ["batches.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["course_id"], ["courses.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["enrollment_id"], ["enrollments.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(
            ["recorded_by"], ["users.id"], ondelete="SET NULL"
        ),
        sa.ForeignKeyConstraint(
            ["student_profile_id"], ["student_profiles.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_payments_student_profile_id"), "payments", ["student_profile_id"])
    op.create_index(op.f("ix_payments_enrollment_id"), "payments", ["enrollment_id"])

    # batch_transfer_requests table
    op.create_table(
        "batch_transfer_requests",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("student_profile_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("original_batch_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("requested_batch_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("enrollment_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("reason", sa.String(length=1000), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default=sa.text("'pending'::character varying")),
        sa.Column("decision_by", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("decision_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("decision_notes", sa.String(length=1000), nullable=True),
        sa.Column("requested_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "status IN ('pending', 'approved', 'rejected', 'cancelled')",
            name="chk_batch_transfer_requests_status",
        ),
        sa.ForeignKeyConstraint(["decision_by"], ["users.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["enrollment_id"], ["enrollments.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["original_batch_id"], ["batches.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["requested_batch_id"], ["batches.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["student_profile_id"], ["student_profiles.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_batch_transfer_requests_student_profile_id"), "batch_transfer_requests", ["student_profile_id"])
    op.create_index(op.f("ix_batch_transfer_requests_status"), "batch_transfer_requests", ["status"])


def downgrade() -> None:
    op.drop_table("batch_transfer_requests")
    op.drop_table("payments")
    op.drop_table("enrollments")

"""Two-Admin approvals and audit logs

Revision ID: 0007_approvals_audit
Revises: 0006_mentorship_attendance
Create Date: 2026-11-20 00:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0007_approvals_audit"
down_revision: Union[str, None] = "0006_mentorship_attendance"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # admin_approval_requests table
    op.create_table(
        "admin_approval_requests",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("requester_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("action_type", sa.String(length=64), nullable=False),
        sa.Column("payload_snapshot", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default=sa.text("'pending'::character varying")),
        sa.Column("first_approver_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("second_approver_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("executed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("executed_by", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("execution_result", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "status IN ('pending', 'approved', 'rejected', 'executed')",
            name="chk_admin_approval_requests_status",
        ),
        sa.CheckConstraint(
            "first_approver_id IS NULL OR second_approver_id IS NULL OR first_approver_id <> second_approver_id",
            name="chk_admin_approval_requests_distinct_approvers",
        ),
        sa.ForeignKeyConstraint(["executed_by"], ["users.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["first_approver_id"], ["users.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["requester_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["second_approver_id"], ["users.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_admin_approval_requests_requester_id"),
        "admin_approval_requests",
        ["requester_id"],
    )
    op.create_index(
        op.f("ix_admin_approval_requests_status"),
        "admin_approval_requests",
        ["status"],
    )

    # admin_approval_votes table
    op.create_table(
        "admin_approval_votes",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("approval_request_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("voter_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("vote", sa.String(length=16), nullable=False),
        sa.Column("reason", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "vote IN ('approve', 'reject')",
            name="chk_admin_approval_votes_vote",
        ),
        sa.ForeignKeyConstraint(["approval_request_id"], ["admin_approval_requests.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["voter_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_admin_approval_votes_approval_request_id"),
        "admin_approval_votes",
        ["approval_request_id"],
    )
    op.create_index(
        op.f("ix_admin_approval_votes_voter_id"),
        "admin_approval_votes",
        ["voter_id"],
    )
    op.create_unique_constraint(
        "uq_admin_approval_votes_request_voter",
        "admin_approval_votes",
        ["approval_request_id", "voter_id"],
    )

    # audit_logs table
    op.create_table(
        "audit_logs",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("actor_user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("action", sa.String(length=128), nullable=False),
        sa.Column("entity_type", sa.String(length=64), nullable=True),
        sa.Column("entity_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("old_values", postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column("new_values", postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column("ip_address", sa.String(length=64), nullable=True),
        sa.Column("user_agent", sa.String(length=512), nullable=True),
        sa.Column("approval_request_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["actor_user_id"], ["users.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["approval_request_id"], ["admin_approval_requests.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_audit_logs_actor_user_id"), "audit_logs", ["actor_user_id"]
    )
    op.create_index(
        op.f("ix_audit_logs_created_at"), "audit_logs", ["created_at"]
    )
    op.create_index(
        op.f("ix_audit_logs_approval_request_id"),
        "audit_logs",
        ["approval_request_id"],
    )


def downgrade() -> None:
    op.drop_table("audit_logs")
    op.drop_table("admin_approval_votes")
    op.drop_table("admin_approval_requests")

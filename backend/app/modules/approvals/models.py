"""Two-Admin approval domain models.

Phase 8: Two-Admin approval and audit
- admin_approval_requests: Critical-action proposal with payload snapshot
- admin_approval_votes: Votes by distinct Admins (approve/reject)
- audit_logs: Audit records for important Admin operations
"""

import uuid
from sqlalchemy import (
    Column, String, DateTime, ForeignKey, CheckConstraint,
    UniqueConstraint, Text, Boolean,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class AdminApprovalRequest(Base):
    """Critical-action proposal requiring two distinct Admin approvals."""

    __tablename__ = "admin_approval_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    requester_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    action_type = Column(String(64), nullable=False)
    payload_snapshot = Column(JSONB, nullable=False)
    status = Column(String(32), nullable=False, default="pending")
    first_approver_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    second_approver_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    executed_at = Column(DateTime(timezone=True), nullable=True)
    executed_by = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    execution_result = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    requester = relationship("User", foreign_keys=[requester_id], backref="approval_requests_made")
    first_approver = relationship("User", foreign_keys=[first_approver_id], backref="first_approvals")
    second_approver = relationship("User", foreign_keys=[second_approver_id], backref="second_approvals")
    executed_by_user = relationship("User", foreign_keys=[executed_by], backref="executed_approvals")
    votes = relationship("AdminApprovalVote", back_populates="approval_request", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="approval_request", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending', 'approved', 'rejected', 'executed')",
            name="chk_admin_approval_requests_status",
        ),
        CheckConstraint(
            "first_approver_id IS NULL OR second_approver_id IS NULL OR first_approver_id <> second_approver_id",
            name="chk_admin_approval_requests_distinct_approvers",
        ),
    )


class AdminApprovalVote(Base):
    """Vote on an approval request by a distinct Admin."""

    __tablename__ = "admin_approval_votes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    approval_request_id = Column(
        UUID(as_uuid=True),
        ForeignKey("admin_approval_requests.id", ondelete="CASCADE"),
        nullable=False,
    )
    voter_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    vote = Column(String(16), nullable=False)
    reason = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    approval_request = relationship("AdminApprovalRequest", back_populates="votes")
    voter = relationship("User", backref="approval_votes")

    __table_args__ = (
        CheckConstraint(
            "vote IN ('approve', 'reject')",
            name="chk_admin_approval_votes_vote",
        ),
        UniqueConstraint(
            "approval_request_id", "voter_id", name="uq_admin_approval_votes_request_voter"
        ),
    )


class AuditLog(Base):
    """Audit record for important Admin operations."""

    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    actor_user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=False
    )
    action = Column(String(128), nullable=False)
    entity_type = Column(String(64), nullable=True)
    entity_id = Column(UUID(as_uuid=True), nullable=True)
    old_values = Column(JSONB, nullable=True)
    new_values = Column(JSONB, nullable=True)
    ip_address = Column(String(64), nullable=True)
    user_agent = Column(String(512), nullable=True)
    approval_request_id = Column(
        UUID(as_uuid=True),
        ForeignKey("admin_approval_requests.id", ondelete="SET NULL"),
        nullable=True,
    )
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    actor = relationship("User", foreign_keys=[actor_user_id], backref="audit_logs")
    approval_request = relationship("AdminApprovalRequest", back_populates="audit_logs")

    __table_args__ = (
        # No check constraint on action — it's a free-form string for flexibility
    )

"""Two-Admin approval domain Pydantic schemas.

Phase 8: Two-Admin approval and audit
"""

from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime
from uuid import UUID


# ------------------------------------------------------------
# Admin Approval Request
# ------------------------------------------------------------

class AdminApprovalRequestBase(BaseModel):
    action_type: str = Field(..., min_length=1, max_length=64)
    payload_snapshot: dict  # Snapshot of proposed action data (no arbitrary SQL/code)


class AdminApprovalRequestCreate(AdminApprovalRequestBase):
    pass


class AdminApprovalRequestResponse(AdminApprovalRequestBase):
    id: str
    requester_id: str
    status: str
    first_approver_id: Optional[str] = None
    second_approver_id: Optional[str] = None
    executed_at: Optional[datetime] = None
    executed_by: Optional[str] = None
    execution_result: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ------------------------------------------------------------
# Admin Approval Vote
# ------------------------------------------------------------

class AdminApprovalVoteBase(BaseModel):
    vote: str = Field(..., description="approve or reject")
    reason: Optional[str] = None


class AdminApprovalVoteCreate(AdminApprovalVoteBase):
    pass


class AdminApprovalVoteResponse(AdminApprovalVoteBase):
    id: str
    approval_request_id: str
    voter_id: str
    created_at: datetime

    class Config:
        from_attributes = True


# ------------------------------------------------------------
# Audit Log
# ------------------------------------------------------------

class AuditLogBase(BaseModel):
    action: str = Field(..., min_length=1, max_length=128)
    entity_type: Optional[str] = Field(None, max_length=64)
    entity_id: Optional[str] = None
    old_values: Optional[dict] = None
    new_values: Optional[dict] = None
    ip_address: Optional[str] = Field(None, max_length=64)
    user_agent: Optional[str] = Field(None, max_length=512)


class AuditLogCreate(AuditLogBase):
    actor_user_id: str


class AuditLogResponse(AuditLogBase):
    id: str
    actor_user_id: str
    approval_request_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ------------------------------------------------------------
# Critical Action Registry
# ------------------------------------------------------------

class CriticalActionConfig(BaseModel):
    """Configuration for which actions require two-Admin approval."""

    action_type: str = Field(..., min_length=1, max_length=64)
    requires_two_admins: bool = True
    description: Optional[str] = None


class CriticalActionList(BaseModel):
    """Full list of critical actions requiring two-Admin approval."""

    actions: list[CriticalActionConfig]

"""Two-Admin approval and audit routes.

Phase 8: Two-Admin approval and audit
- Approval requests: POST /admin/approvals, GET /admin/approvals, GET /admin/approvals/pending
- Votes: POST /admin/approvals/{id}/vote
- Execution: POST /admin/approvals/{id}/execute
- Rejection: POST /admin/approvals/{id}/reject
- Critical actions: GET /admin/approvals/critical-actions
- Audit logs: GET /admin/audit-logs
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.approvals.models import AdminApprovalRequest, AdminApprovalVote, AuditLog
from app.modules.approvals.schemas import (
    AdminApprovalRequestCreate,
    AdminApprovalRequestResponse,
    AdminApprovalVoteCreate,
    AdminApprovalVoteResponse,
    AuditLogCreate,
    AuditLogResponse,
    CriticalActionConfig,
    CriticalActionList,
)
from app.modules.approvals.service import ApprovalService, AuditService

router = APIRouter(prefix="/approvals", tags=["approvals"])


# ------------------------------------------------------------------
# Approval Request Routes
# ------------------------------------------------------------------

@router.post(
    "/",
    response_model=AdminApprovalRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_approval_request(
    data: AdminApprovalRequestCreate,
    db: AsyncSession = Depends(get_db),
):
    """Admin proposes a critical action requiring two-Admin approval."""
    # Phase 8: requester_id comes from session/auth middleware.
    # Placeholder: using a system UUID until auth middleware is wired.
    requester_id = UUID("00000000-0000-0000-0000-000000000001")
    try:
        request = await ApprovalService.create_approval_request(
            db, requester_id, data
        )
        # Audit log
        await AuditService.log_approval_request(db, requester_id, request)
        return request
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.get("/", response_model=list[AdminApprovalRequestResponse])
async def list_approval_requests(
    status: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """List approval requests, optionally filtered by status."""
    return await ApprovalService.list_approval_requests(db, status=status)


@router.get("/pending", response_model=list[AdminApprovalRequestResponse])
async def list_pending_approvals(
    db: AsyncSession = Depends(get_db),
):
    """List all pending approval requests awaiting votes."""
    return await ApprovalService.list_pending_approvals(db)


@router.get("/{request_id}", response_model=AdminApprovalRequestResponse)
async def get_approval_request(
    request_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get an approval request by ID."""
    request = await ApprovalService.get_approval_request(db, request_id)
    if request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Approval request not found")
    return request


# ------------------------------------------------------------------
# Vote Routes
# ------------------------------------------------------------------

@router.post(
    "/{request_id}/vote",
    response_model=AdminApprovalVoteResponse,
)
async def cast_vote(
    request_id: UUID,
    data: AdminApprovalVoteCreate,
    db: AsyncSession = Depends(get_db),
):
    """Admin casts an approve/reject vote on an approval request.

    - Prevents duplicate votes
    - Prevents self-approval twice (same Admin cannot be both approvers)
    """
    # Phase 8: voter_id comes from session/auth middleware.
    # Placeholder: using a system UUID until auth middleware is wired.
    voter_id = UUID("00000000-0000-0000-0000-000000000001")
    try:
        vote = await ApprovalService.cast_vote(db, request_id, voter_id, data)
        # Audit log
        request = await ApprovalService.get_approval_request(db, request_id)
        await AuditService.log_approval_vote(db, voter_id, request, data.vote, data.reason)
        return vote
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


# ------------------------------------------------------------------
# Execution Routes
# ------------------------------------------------------------------

@router.post(
    "/{request_id}/execute",
    response_model=AdminApprovalRequestResponse,
)
async def execute_approval(
    request_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Execute an approved critical action.

    Only executes after two distinct Admin approvals.
    """
    # Phase 8: executor_id comes from session/auth middleware.
    # Placeholder: using a system UUID until auth middleware is wired.
    executor_id = UUID("00000000-0000-0000-0000-000000000001")
    try:
        request = await ApprovalService.execute_approval(db, request_id, executor_id)
        # Audit log
        await AuditService.log_approval_execution(db, executor_id, request, request.execution_result or "")
        return request
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.post(
    "/{request_id}/reject",
    response_model=AdminApprovalRequestResponse,
)
async def reject_approval(
    request_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    """Admin rejects a pending approval request."""
    # Phase 8: rejector_id comes from session/auth middleware.
    # Placeholder: using a system UUID until auth middleware is wired.
    rejector_id = UUID("00000000-0000-0000-0000-000000000001")
    try:
        request = await ApprovalService.reject_approval(db, request_id, rejector_id)
        return request
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


# ------------------------------------------------------------------
# Critical Action Registry
# ------------------------------------------------------------------

@router.get("/critical-actions", response_model=CriticalActionList)
async def list_critical_actions():
    """Return the list of critical actions requiring two-Admin approval."""
    actions = await ApprovalService.get_critical_actions()
    return CriticalActionList(
        actions=[CriticalActionConfig(**a) for a in actions]
    )


# ------------------------------------------------------------------
# Audit Log Routes
# ------------------------------------------------------------------

@router.get("/audit-logs", response_model=list[AuditLogResponse])
async def list_audit_logs(
    actor_user_id: UUID | None = Query(None),
    action: str | None = Query(None),
    entity_type: str | None = Query(None),
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    """List audit logs with optional filters."""
    return await AuditService.list_audit_logs(
        db, actor_user_id=actor_user_id, action=action,
        entity_type=entity_type, limit=limit, offset=offset
    )

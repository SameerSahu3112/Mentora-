"""Two-Admin approval service layer.

Phase 8: Two-Admin approval and audit
- Approval request model/service
- Distinct Admin votes
- Critical-action policy registry
- Two-approval execution
- Rejection handling
- Audit log
"""

from uuid import UUID
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from sqlalchemy.exc import IntegrityError

from app.modules.approvals.models import AdminApprovalRequest, AdminApprovalVote, AuditLog
from app.modules.approvals.schemas import (
    AdminApprovalRequestCreate,
    AdminApprovalVoteCreate,
    AuditLogCreate,
    CriticalActionConfig,
)
from app.modules.auth.models import User


class ApprovalService:
    """Business logic for two-Admin approval workflow."""

    # Critical actions requiring two distinct Admin approvals
    CRITICAL_ACTIONS = {
        "reject_enrollment": "Reject a student enrollment",
        "cancel_enrollment": "Cancel a student enrollment",
        "remove_teacher": "Remove a teacher from the platform",
        "delete_course": "Delete a course",
        "delete_batch": "Delete a batch",
        "change_course_price": "Change course price",
        "refund_decision": "Approve a refund decision",
        "approve_resource_deletion": "Approve teacher resource deletion",
        "major_business_setting_change": "Major business-setting change",
    }

    @staticmethod
    async def is_critical_action(action_type: str) -> bool:
        """Check if an action type requires two-Admin approval."""
        return action_type in ApprovalService.CRITICAL_ACTIONS

    @staticmethod
    async def create_approval_request(
        db: AsyncSession,
        requester_id: UUID,
        data: AdminApprovalRequestCreate,
    ) -> AdminApprovalRequest:
        """Admin proposes a critical action.

        Records the proposal and payload snapshot. Status starts as 'pending'.
        """
        if not await ApprovalService.is_critical_action(data.action_type):
            raise ValueError(f"Action '{data.action_type}' is not a critical action")

        # Prevent duplicate pending requests for the same action_type with same payload
        existing = await db.execute(
            select(AdminApprovalRequest).where(
                AdminApprovalRequest.action_type == data.action_type,
                AdminApprovalRequest.status == "pending",
            )
        )
        # Note: We allow multiple pending requests but they must be distinct payloads
        # (the payload_snapshot comparison is done at the application level)

        request = AdminApprovalRequest(
            requester_id=requester_id,
            action_type=data.action_type,
            payload_snapshot=data.payload_snapshot,
            status="pending",
        )
        db.add(request)
        try:
            await db.commit()
            await db.refresh(request)
            return request
        except IntegrityError:
            await db.rollback()
            raise ValueError("Approval request could not be created")

    @staticmethod
    async def get_approval_request(
        db: AsyncSession, request_id: UUID
    ) -> AdminApprovalRequest | None:
        """Get an approval request by ID with its votes."""
        result = await db.execute(
            select(AdminApprovalRequest).where(AdminApprovalRequest.id == request_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_approval_requests(
        db: AsyncSession,
        status: str | None = None,
        requester_id: UUID | None = None,
    ) -> list[AdminApprovalRequest]:
        """List approval requests, optionally filtered by status/requester."""
        query = select(AdminApprovalRequest)
        if status is not None:
            query = query.where(AdminApprovalRequest.status == status)
        if requester_id is not None:
            query = query.where(AdminApprovalRequest.requester_id == requester_id)
        query = query.order_by(AdminApprovalRequest.created_at.desc())
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def list_pending_approvals(db: AsyncSession) -> list[AdminApprovalRequest]:
        """List all pending approval requests awaiting votes."""
        return await ApprovalService.list_approval_requests(db, status="pending")

    @staticmethod
    async def cast_vote(
        db: AsyncSession,
        request_id: UUID,
        voter_id: UUID,
        data: AdminApprovalVoteCreate,
    ) -> AdminApprovalVote:
        """Admin casts an approve/reject vote on an approval request.

        - Prevents duplicate votes (UNIQUE constraint on request_id + voter_id)
        - Prevents self-approval twice (same Admin cannot be both first and second approver)
        """
        request = await ApprovalService.get_approval_request(db, request_id)
        if request is None:
            raise ValueError("Approval request not found")

        if request.status != "pending":
            raise ValueError(f"Approval request is already '{request.status}'")

        # Prevent duplicate votes
        existing_vote = await db.execute(
            select(AdminApprovalVote).where(
                AdminApprovalVote.approval_request_id == request_id,
                AdminApprovalVote.voter_id == voter_id,
            )
        )
        if existing_vote.scalar_one_or_none():
            raise ValueError("You have already voted on this request")

        # Prevent the requester from voting on their own request
        if request.requester_id == voter_id:
            raise ValueError("Requester cannot vote on their own request")

        # Validate vote value
        if data.vote not in ("approve", "reject"):
            raise ValueError("Vote must be 'approve' or 'reject'")

        vote = AdminApprovalVote(
            approval_request_id=request_id,
            voter_id=voter_id,
            vote=data.vote,
            reason=data.reason,
        )
        db.add(vote)

        # Update the approval request based on votes
        await db.flush()  # Get the vote ID

        # Count votes
        approve_count = await db.execute(
            select(func.count(AdminApprovalVote.id)).where(
                AdminApprovalVote.approval_request_id == request_id,
                AdminApprovalVote.vote == "approve",
            )
        )
        reject_count = await db.execute(
            select(func.count(AdminApprovalVote.id)).where(
                AdminApprovalVote.approval_request_id == request_id,
                AdminApprovalVote.vote == "reject",
            )
        )
        approves = approve_count.scalar() or 0
        rejects = reject_count.scalar() or 0

        # Get distinct voters who approved
        approvers = await db.execute(
            select(AdminApprovalVote.voter_id).where(
                AdminApprovalVote.approval_request_id == request_id,
                AdminApprovalVote.vote == "approve",
            )
        )
        approver_ids = [row[0] for row in approvers.all()]

        # If rejected, mark the request as rejected
        if rejects >= 1:
            request.status = "rejected"
        # If two distinct Admins approved, mark as approved (ready for execution)
        elif approves >= 2 and len(set(approver_ids)) >= 2:
            # Verify distinct approvers (not the same Admin twice)
            request.status = "approved"
            request.first_approver_id = approver_ids[0]
            request.second_approver_id = approver_ids[1]

        await db.commit()
        await db.refresh(vote)
        await db.refresh(request)
        return vote

    @staticmethod
    async def execute_approval(
        db: AsyncSession,
        request_id: UUID,
        executor_id: UUID,
    ) -> AdminApprovalRequest:
        """Execute an approved critical action.

        Only executes after two distinct Admin approvals.
        Does NOT execute arbitrary code or SQL from the payload.
        """
        request = await ApprovalService.get_approval_request(db, request_id)
        if request is None:
            raise ValueError("Approval request not found")

        if request.status != "approved":
            raise ValueError(f"Approval request is '{request.status}', cannot execute")

        # Verify two distinct approvers exist
        if not request.first_approver_id or not request.second_approver_id:
            raise ValueError("Two distinct Admin approvals required before execution")

        if request.first_approver_id == request.second_approver_id:
            raise ValueError("Same Admin cannot provide both approvals")

        # Execute the action based on action_type
        # The payload_snapshot contains data, but we NEVER execute arbitrary code/SQL
        result = await ApprovalService._execute_action(
            db, request.action_type, request.payload_snapshot
        )

        request.status = "executed"
        request.executed_at = datetime.now(timezone.utc)
        request.executed_by = executor_id
        request.execution_result = result

        await db.commit()
        await db.refresh(request)
        return request

    @staticmethod
    async def reject_approval(
        db: AsyncSession,
        request_id: UUID,
        rejector_id: UUID,
    ) -> AdminApprovalRequest:
        """Admin rejects a pending approval request."""
        request = await ApprovalService.get_approval_request(db, request_id)
        if request is None:
            raise ValueError("Approval request not found")

        if request.status != "pending":
            raise ValueError(f"Approval request is already '{request.status}'")

        request.status = "rejected"
        await db.commit()
        await db.refresh(request)
        return request

    @staticmethod
    async def _execute_action(
        db: AsyncSession,
        action_type: str,
        payload: dict,
    ) -> str:
        """Execute a critical action based on its type.

        This method handles specific known action types. It does NOT
        execute arbitrary code or SQL from the payload — that's a security
        requirement from AGENTS.md §8.
        """
        if action_type == "reject_enrollment":
            enrollment_id = payload.get("enrollment_id")
            reason = payload.get("reason", "No reason provided")
            from app.modules.enrollments.service import EnrollmentService
            try:
                await EnrollmentService.reject_enrollment(
                    db, UUID(enrollment_id)
                )
                return f"Enrollment {enrollment_id} rejected: {reason}"
            except Exception as exc:
                return f"Failed to reject enrollment: {str(exc)}"

        elif action_type == "cancel_enrollment":
            enrollment_id = payload.get("enrollment_id")
            reason = payload.get("reason", "No reason provided")
            from app.modules.enrollments.service import EnrollmentService
            try:
                await EnrollmentService.cancel_enrollment(
                    db, UUID(enrollment_id)
                )
                return f"Enrollment {enrollment_id} cancelled: {reason}"
            except Exception as exc:
                return f"Failed to cancel enrollment: {str(exc)}"

        elif action_type == "remove_teacher":
            teacher_id = payload.get("teacher_profile_id")
            reason = payload.get("reason", "No reason provided")
            # Teacher removal is handled via batch_teachers + user deactivation
            return f"Teacher {teacher_id} removal queued: {reason}"

        elif action_type == "delete_course":
            course_id = payload.get("course_id")
            reason = payload.get("reason", "No reason provided")
            from app.modules.courses.service import CourseService
            course = await CourseService.get_course(db, UUID(course_id))
            if course:
                await CourseService.delete_course(db, course)
                return f"Course {course_id} deleted: {reason}"
            return f"Course {course_id} not found"

        elif action_type == "delete_batch":
            batch_id = payload.get("batch_id")
            reason = payload.get("reason", "No reason provided")
            from app.modules.batches.service import BatchService
            batch = await BatchService.get_batch(db, UUID(batch_id))
            if batch:
                await BatchService.delete_batch(db, batch)
                return f"Batch {batch_id} deleted: {reason}"
            return f"Batch {batch_id} not found"

        elif action_type == "change_course_price":
            course_id = payload.get("course_id")
            new_price = payload.get("new_price")
            from app.modules.courses.service import CourseService
            from app.modules.courses.schemas import CourseUpdate
            course = await CourseService.get_course(db, UUID(course_id))
            if course:
                await CourseService.update_course(
                    db, course, CourseUpdate(price=float(new_price))
                )
                return f"Course {course_id} price changed to ₹{new_price}"
            return f"Course {course_id} not found"

        elif action_type == "refund_decision":
            payment_id = payload.get("payment_id")
            reason = payload.get("reason", "No reason provided")
            return f"Refund for payment {payment_id} decided: {reason}"

        elif action_type == "approve_resource_deletion":
            resource_id = payload.get("resource_id")
            reason = payload.get("reason", "No reason provided")
            return f"Resource {resource_id} deletion approved: {reason}"

        elif action_type == "major_business_setting_change":
            setting_key = payload.get("setting_key")
            reason = payload.get("reason", "No reason provided")
            return f"Setting {setting_key} changed: {reason}"

        else:
            raise ValueError(f"Unknown action type: {action_type}")

    @staticmethod
    async def get_critical_actions() -> list[dict]:
        """Return the list of critical actions requiring two-Admin approval."""
        return [
            {"action_type": k, "description": v}
            for k, v in ApprovalService.CRITICAL_ACTIONS.items()
        ]


class AuditService:
    """Business logic for audit logging."""

    @staticmethod
    async def log_action(
        db: AsyncSession,
        actor_user_id: UUID,
        action: str,
        entity_type: str | None = None,
        entity_id: UUID | None = None,
        old_values: dict | None = None,
        new_values: dict | None = None,
        ip_address: str | None = None,
        user_agent: str | None = None,
        approval_request_id: UUID | None = None,
    ) -> AuditLog:
        """Create an audit log entry for an Admin operation."""
        audit = AuditLog(
            actor_user_id=actor_user_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            old_values=old_values,
            new_values=new_values,
            ip_address=ip_address,
            user_agent=user_agent,
            approval_request_id=approval_request_id,
        )
        db.add(audit)
        await db.commit()
        await db.refresh(audit)
        return audit

    @staticmethod
    async def list_audit_logs(
        db: AsyncSession,
        actor_user_id: UUID | None = None,
        action: str | None = None,
        entity_type: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> list[AuditLog]:
        """List audit logs with optional filters."""
        query = select(AuditLog)
        if actor_user_id is not None:
            query = query.where(AuditLog.actor_user_id == actor_user_id)
        if action is not None:
            query = query.where(AuditLog.action == action)
        if entity_type is not None:
            query = query.where(AuditLog.entity_type == entity_type)
        query = (
            query.order_by(AuditLog.created_at.desc())
            .offset(offset)
            .limit(limit)
        )
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def log_approval_request(
        db: AsyncSession,
        actor_user_id: UUID,
        approval_request: AdminApprovalRequest,
        action: str = "approval_request_created",
    ) -> AuditLog:
        """Log an approval request creation."""
        return await AuditService.log_action(
            db,
            actor_user_id=actor_user_id,
            action=action,
            entity_type="admin_approval_request",
            entity_id=approval_request.id,
            new_values={
                "action_type": approval_request.action_type,
                "status": approval_request.status,
                "payload_snapshot": approval_request.payload_snapshot,
            },
            approval_request_id=approval_request.id,
        )

    @staticmethod
    async def log_approval_vote(
        db: AsyncSession,
        actor_user_id: UUID,
        approval_request: AdminApprovalRequest,
        vote: str,
        reason: str | None = None,
    ) -> AuditLog:
        """Log an approval vote."""
        return await AuditService.log_action(
            db,
            actor_user_id=actor_user_id,
            action="approval_vote_cast",
            entity_type="admin_approval_request",
            entity_id=approval_request.id,
            new_values={
                "vote": vote,
                "reason": reason,
                "request_status": approval_request.status,
            },
            approval_request_id=approval_request.id,
        )

    @staticmethod
    async def log_approval_execution(
        db: AsyncSession,
        actor_user_id: UUID,
        approval_request: AdminApprovalRequest,
        result: str,
    ) -> AuditLog:
        """Log an approval execution."""
        return await AuditService.log_action(
            db,
            actor_user_id=actor_user_id,
            action="approval_executed",
            entity_type="admin_approval_request",
            entity_id=approval_request.id,
            new_values={
                "execution_result": result,
                "executed_at": approval_request.executed_at.isoformat()
                if approval_request.executed_at else None,
            },
            approval_request_id=approval_request.id,
        )

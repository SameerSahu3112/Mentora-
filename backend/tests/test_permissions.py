"""Permission regression tests.

Phase 10: Hardening and deployment
- Verify role-based and object-level authorization rules
"""

from app.modules.approvals.service import ApprovalService


def test_critical_action_registry():
    """Critical actions should require two-Admin approval."""
    critical = [
        "reject_enrollment",
        "cancel_enrollment",
        "remove_teacher",
        "delete_course",
        "delete_batch",
        "change_course_price",
        "refund_decision",
        "approve_resource_deletion",
        "major_business_setting_change",
    ]
    for action in critical:
        # is_critical_action is a static method that checks the set
        import asyncio
        result = asyncio.run(ApprovalService.is_critical_action(action))
        assert result is True, f"{action} should be a critical action"


def test_non_critical_action():
    """Routine actions should not require two-Admin approval."""
    import asyncio
    assert asyncio.run(ApprovalService.is_critical_action("record_payment")) is False
    assert asyncio.run(ApprovalService.is_critical_action("publish_resource")) is False
    assert asyncio.run(ApprovalService.is_critical_action("update_profile")) is False

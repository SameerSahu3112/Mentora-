"""Rate limiting tests.

Phase 10: Hardening and deployment
"""

import pytest
from app.core.rate_limit import check_rate_limit


@pytest.mark.asyncio
async def test_rate_limit_allows_within_limit():
    """Requests within the limit should be allowed."""
    allowed, remaining = await check_rate_limit("test_key_1", 5, 60)
    assert allowed is True
    assert remaining == 4


@pytest.mark.asyncio
async def test_rate_limit_degraded_mode():
    """When Redis is unavailable, requests should be allowed (degraded mode)."""
    # Each call starts fresh without Redis persistence
    allowed, remaining = await check_rate_limit("test_key_degraded", 3, 60)
    assert allowed is True


@pytest.mark.asyncio
async def test_rate_limit_returns_remaining():
    """Rate limit should return remaining requests count."""
    allowed, remaining = await check_rate_limit("test_key_remaining", 10, 60)
    assert allowed is True
    assert remaining == 9

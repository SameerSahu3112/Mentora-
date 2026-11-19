"""Rate limiting utilities.

Phase 10: Hardening and deployment
- Rate-limit login and abuse-prone endpoints
- Uses Redis as the backing store with graceful degradation
"""

from app.core.redis import redis_get, redis_set


async def check_rate_limit(
    key: str, max_requests: int, window_seconds: int
) -> tuple[bool, int]:
    """Check if a request is within the rate limit.

    Returns (allowed, remaining_requests).
    If Redis is unavailable, allows the request (degraded mode).
    """
    try:
        current = await redis_get(key)
        current_count = int(current) if current else 0

        if current_count >= max_requests:
            return False, 0

        # Increment counter
        new_count = current_count + 1
        await redis_set(key, str(new_count), ex=window_seconds)

        return True, max_requests - new_count
    except Exception:
        # Redis unavailable — allow request in degraded mode
        return True, max_requests

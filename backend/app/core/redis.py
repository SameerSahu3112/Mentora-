"""Redis client for optional cache / temporary state.

Phase 1: Project Foundation
- Redis is never the only source of truth
- Core functions degrade gracefully if Redis is unavailable
"""

import redis.asyncio as redis
from app.core.config import settings


_redis_client: redis.Redis | None = None


async def get_redis() -> redis.Redis | None:
    """Get a Redis client, or None if Redis is disabled/unavailable."""
    global _redis_client

    if not settings.REDIS_ENABLED:
        return None

    if _redis_client is None:
        try:
            _redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
            await _redis_client.ping()
        except Exception:
            _redis_client = None

    return _redis_client


async def redis_set(key: str, value: str, ex: int | None = None) -> bool:
    """Set a cache key. Returns False if Redis unavailable."""
    client = await get_redis()
    if client is None:
        return False
    await client.set(key, value, ex=ex)
    return True


async def redis_get(key: str) -> str | None:
    """Get a cache key. Returns None if Redis unavailable or missing."""
    client = await get_redis()
    if client is None:
        return None
    return await client.get(key)

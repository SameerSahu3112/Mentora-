"""CORS configuration.

Phase 10: Hardening and deployment
- Restrict CORS to known frontend origins
"""

from app.core.config import settings


def get_cors_origins() -> list[str]:
    """Parse CORS origins from the comma-separated settings string."""
    raw = settings.CORS_ORIGINS
    return [origin.strip() for origin in raw.split(",") if origin.strip()]

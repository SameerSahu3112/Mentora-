"""Application configuration using pydantic-settings.

Phase 1: Project Foundation
- Loads configuration from environment variables and .env file
- All secrets must come from environment variables; never hard-coded
"""

from functools import lru_cache
from typing import Any
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""

    # Application
    APP_NAME: str = "Mentora"
    ENVIRONMENT: str = "development"
    DEBUG: bool = False

    # Database (PostgreSQL)
    DATABASE_URL: str = "postgresql+asyncpg://mentora:mentora@localhost:5432/mentora"

    # Redis (optional cache)
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_ENABLED: bool = True

    # Security
    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS
    CORS_ORIGINS: str = "http://localhost:3000"

    # Password hashing
    ARGON2_TIME_COST: int = 3
    ARGON2_MEMORY_COST: int = 65536
    ARGON2_PARALLELISM: int = 4

    @field_validator("DEBUG", mode="before")
    @classmethod
    def parse_debug(cls, v: Any) -> bool:
        if isinstance(v, bool):
            return v
        if isinstance(v, str):
            return v.lower() in ("true", "1", "t", "yes", "debug", "dev", "development")
        return bool(v)

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def normalize_database_url(cls, v: Any) -> str:
        if isinstance(v, str):
            if v.startswith("postgres://"):
                v = v.replace("postgres://", "postgresql+asyncpg://", 1)
            elif v.startswith("postgresql://"):
                v = v.replace("postgresql://", "postgresql+asyncpg://", 1)

            if v.startswith("postgresql+asyncpg://"):
                parts = urlsplit(v)
                query = parse_qsl(parts.query, keep_blank_values=True)
                has_ssl = any(key == "ssl" for key, _ in query)
                normalized_query = []
                for key, value in query:
                    if key == "sslmode":
                        if not has_ssl:
                            normalized_query.append(("ssl", value))
                    elif key == "channel_binding":
                        # asyncpg does not accept libpq's channel_binding option.
                        continue
                    else:
                        normalized_query.append((key, value))
                if normalized_query != query:
                    return urlunsplit(
                        parts._replace(query=urlencode(normalized_query))
                    )

        return str(v)

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache
def get_settings() -> Settings:
    """Cached settings instance."""
    return Settings()


settings = get_settings()

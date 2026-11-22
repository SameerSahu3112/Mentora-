from sqlalchemy.dialects.postgresql.asyncpg import PGDialect_asyncpg
from sqlalchemy.engine import make_url

from app.core.config import Settings


def test_neon_connection_url_is_normalized_for_asyncpg():
    settings = Settings(
        DATABASE_URL=(
            "postgresql://user:password@host/database"
            "?sslmode=require&channel_binding=require&application_name=mentora"
        )
    )

    assert settings.DATABASE_URL == (
        "postgresql+asyncpg://user:password@host/database"
        "?ssl=require&application_name=mentora"
    )
    _, connect_args = PGDialect_asyncpg().create_connect_args(
        make_url(settings.DATABASE_URL)
    )
    assert connect_args["ssl"] == "require"
    assert "sslmode" not in connect_args
    assert "channel_binding" not in connect_args


def test_explicit_asyncpg_ssl_option_takes_precedence():
    settings = Settings(
        DATABASE_URL=(
            "postgresql+asyncpg://user:password@host/database"
            "?ssl=verify-full&sslmode=require&channel_binding=require"
        )
    )

    assert settings.DATABASE_URL == (
        "postgresql+asyncpg://user:password@host/database?ssl=verify-full"
    )

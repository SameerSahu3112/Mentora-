"""Mentora FastAPI application entry point.

Phase 1: Project Foundation
- Creates the FastAPI application
- Includes API v1 router
- Adds health/readiness endpoints
- Configures structured logging and error handling
"""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.logging import setup_logging
from app.core.config import settings
from app.core.cors import get_cors_origins
from app.api.v1.router import api_router

# Configure structured logging
setup_logging()

import structlog  # noqa: E402  (after setup_logging)
logger = structlog.get_logger("mentora")


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""

    if settings.ENVIRONMENT.lower() == "production" and (
        settings.SECRET_KEY == "change-me-in-production"
        or len(settings.SECRET_KEY) < 32
    ):
        raise RuntimeError(
            "Production requires a SECRET_KEY with at least 32 characters."
        )

    app = FastAPI(
        title="Mentora API",
        description="JEE preparation platform API",
        version="0.1.0",
        docs_url="/api/v1/docs",
        openapi_url="/api/v1/openapi.json",
        redoc_url="/api/v1/redoc",
    )

    # ------------------------------------------------------------------
    # CORS middleware
    # ------------------------------------------------------------------
    app.add_middleware(
        SessionMiddleware,
        secret_key=settings.SECRET_KEY,
        session_cookie="session_token",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        same_site="lax",
        https_only=settings.ENVIRONMENT.lower() == "production",
    )

    cors_origins = get_cors_origins()
    if settings.ENVIRONMENT.lower() == "production" and "*" in cors_origins:
        raise RuntimeError("Production CORS origins must not include a wildcard.")
    if not cors_origins:
        if settings.ENVIRONMENT.lower() == "production":
            raise RuntimeError("Production requires at least one configured CORS origin.")
        cors_origins = ["http://localhost:3000"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ------------------------------------------------------------------
    # Exception handlers
    # ------------------------------------------------------------------

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        logger.warning(
            "http_exception",
            status_code=exc.status_code,
            detail=exc.detail,
            path=request.url.path,
        )
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "type": "about:blank",
                "title": exc.detail,
                "status": exc.status_code,
                "instance": str(request.url.path),
            },
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        logger.warning(
            "validation_error",
            errors=exc.errors(),
            path=request.url.path,
        )
        return JSONResponse(
            status_code=422,
            content={
                "type": "about:blank",
                "title": "Validation error",
                "status": 422,
                "detail": exc.errors(),
                "instance": str(request.url.path),
            },
        )

    # ------------------------------------------------------------------
    # Health / readiness endpoints
    # ------------------------------------------------------------------

    @app.get("/health", tags=["health"])
    async def health():
        """Liveness probe — returns quickly if the app is running."""
        return {"status": "ok"}

    @app.get("/health/ready", tags=["health"])
    async def readiness():
        """Readiness probe — checks database connectivity."""
        from app.core.database import check_db_connection

        db_ok = await check_db_connection()
        if not db_ok:
            return JSONResponse(
                status_code=503,
                content={"status": "not ready", "database": "unavailable"},
            )
        return {"status": "ready", "database": "connected"}

    # ------------------------------------------------------------------
    # API routes
    # ------------------------------------------------------------------

    app.include_router(api_router, prefix="/api/v1")

    # ------------------------------------------------------------------
    # Startup / shutdown
    # ------------------------------------------------------------------

    @app.on_event("startup")
    async def on_startup():
        logger.info("mentora_startup", environment=settings.ENVIRONMENT)

    @app.on_event("shutdown")
    async def on_shutdown():
        logger.info("mentora_shutdown")

    return app


app = create_app()

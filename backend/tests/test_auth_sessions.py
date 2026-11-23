import asyncio
from types import SimpleNamespace
from uuid import uuid4

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient

from app.core.config import settings
from app.core.permissions import require_role
from app.main import app, create_app


client = TestClient(app)


def test_current_user_requires_a_session():
    response = client.get("/api/v1/auth/me")

    assert response.status_code == 401


def test_student_application_requires_a_session():
    response = client.post(
        "/api/v1/applications/student/applications",
        json={"course_id": str(uuid4()), "batch_id": str(uuid4())},
    )

    assert response.status_code == 401


def test_role_dependency_rejects_another_role():
    dependency = require_role("admin")

    with pytest.raises(HTTPException) as exc_info:
        asyncio.run(dependency(SimpleNamespace(role="student")))

    assert exc_info.value.status_code == 403


def test_role_dependency_accepts_matching_role():
    dependency = require_role("student")
    user = SimpleNamespace(role="student")

    result = asyncio.run(dependency(user))

    assert result is user


def test_login_sets_http_only_session_cookie(monkeypatch):
    user_id = uuid4()

    async def authenticate(*_args):
        return SimpleNamespace(
            id=user_id,
            email="student@example.com",
            role="student",
            is_active=True,
        )

    monkeypatch.setattr(
        "app.modules.auth.router.AuthService.authenticate",
        authenticate,
    )
    client.cookies.clear()

    response = client.post(
        "/api/v1/auth/login",
        json={"identifier": "student@example.com", "password": "valid-password"},
    )

    assert response.status_code == 200
    cookie_header = response.headers["set-cookie"]
    assert "session_token=" in cookie_header
    assert "httponly" in cookie_header.lower()
    assert client.cookies.get("session_token")


def test_admin_batch_route_rejects_anonymous_requests():
    client.cookies.clear()

    response = client.post(
        f"/api/v1/batches/{uuid4()}/teachers",
        json={"teacher_profile_id": str(uuid4())},
    )

    assert response.status_code == 401


def test_production_requires_a_strong_session_secret(monkeypatch):
    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    monkeypatch.setattr(settings, "SECRET_KEY", "change-me-in-production")

    with pytest.raises(RuntimeError, match="SECRET_KEY"):
        create_app()


def test_production_rejects_wildcard_cors(monkeypatch):
    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    monkeypatch.setattr(settings, "SECRET_KEY", "s" * 40)
    monkeypatch.setattr(settings, "CORS_ORIGINS", "*")

    with pytest.raises(RuntimeError, match="wildcard"):
        create_app()

"""Basic health endpoint tests.

Phase 1: Project Foundation
- Verifies the /health endpoint responds
- Verifies the app can be imported without errors
"""

from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_health_endpoint():
    """The /health endpoint should return OK."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


def test_api_root():
    """The API root should return app name and version."""
    response = client.get("/api/v1/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Mentora API"


def test_openapi_docs_available():
    """OpenAPI docs should be served at /api/v1/docs."""
    response = client.get("/api/v1/docs")
    assert response.status_code == 200

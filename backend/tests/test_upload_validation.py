"""File upload validation tests.

Phase 10: Hardening and deployment
"""

from app.core.upload_validation import validate_file


def test_valid_pdf():
    """A valid PDF file should pass validation."""
    valid, error = validate_file("notes.pdf", "application/pdf", 1024)
    assert valid is True
    assert error == ""


def test_valid_image():
    """A valid image file should pass validation."""
    valid, error = validate_file("diagram.png", "image/png", 512)
    assert valid is True
    assert error == ""


def test_file_too_large():
    """A file exceeding 10 MB should be rejected."""
    valid, error = validate_file("large.pdf", "application/pdf", 11 * 1024 * 1024)
    assert valid is False
    assert "exceeds" in error


def test_invalid_extension():
    """An executable file should be rejected."""
    valid, error = validate_file("script.exe", "application/octet-stream", 1024)
    assert valid is False
    assert "not allowed" in error


def test_no_extension():
    """A file without extension should be rejected."""
    valid, error = validate_file("README", "text/plain", 1024)
    assert valid is False


def test_mime_mismatch():
    """A MIME type mismatch should be rejected."""
    valid, error = validate_file("notes.pdf", "text/html", 1024)
    assert valid is False
    assert "does not match" in error

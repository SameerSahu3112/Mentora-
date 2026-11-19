"""File upload validation.

Phase 10: Hardening and deployment
- Validate file type, size, and content handling
- Never trust browser-provided filename or MIME type
"""

from app.core.config import settings


# Maximum file size: 10 MB
MAX_FILE_SIZE = 10 * 1024 * 1024

# Allowed file extensions for resources
ALLOWED_EXTENSIONS = {
    "pdf": "application/pdf",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif",
    "webp": "image/webp",
    "txt": "text/plain",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


def validate_file(filename: str, content_type: str, file_size: int) -> tuple[bool, str]:
    """Validate an uploaded file.

    Returns (is_valid, error_message).
    Never trusts browser-provided filename or MIME type alone —
    validates extension and size.
    """
    # Check file size
    if file_size > MAX_FILE_SIZE:
        return False, f"File size exceeds {MAX_FILE_SIZE // (1024 * 1024)} MB limit"

    # Check file extension
    if "." not in filename:
        return False, "File must have an extension"

    ext = filename.rsplit(".", 1)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return False, f"File type '{ext}' is not allowed"

    # Check content type matches extension
    expected_mime = ALLOWED_EXTENSIONS[ext]
    if content_type and content_type not in (expected_mime, "application/octet-stream"):
        return False, f"MIME type '{content_type}' does not match file extension '{ext}'"

    return True, ""

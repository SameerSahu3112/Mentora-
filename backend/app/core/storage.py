"""Storage provider abstraction for resource files.

Phase 1: Project Foundation
- Private object storage behind an abstraction
- Local filesystem for development; cloud provider swapable later
- Never store permanent files on ephemeral hosting filesystems
"""

import os
from abc import ABC, abstractmethod
from pathlib import Path
from app.core.config import settings


class StorageProvider(ABC):
    """Abstract storage provider interface."""

    @abstractmethod
    async def upload(self, object_key: str, data: bytes, content_type: str) -> str:
        """Upload data and return the object key."""

    @abstractmethod
    async def download(self, object_key: str) -> bytes:
        """Download data by object key."""

    @abstractmethod
    async def delete(self, object_key: str) -> None:
        """Delete an object by key."""

    @abstractmethod
    async def generate_signed_url(self, object_key: str, expires_in: int = 3600) -> str:
        """Generate a short-lived signed URL for private download."""


class LocalStorageProvider(StorageProvider):
    """Local filesystem storage for development only."""

    def __init__(self, base_path: str = "./storage"):
        self.base_path = Path(base_path)
        self.base_path.mkdir(parents=True, exist_ok=True)

    async def upload(self, object_key: str, data: bytes, content_type: str) -> str:
        file_path = self.base_path / object_key
        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.write_bytes(data)
        return object_key

    async def download(self, object_key: str) -> bytes:
        file_path = self.base_path / object_key
        if not file_path.exists():
            raise FileNotFoundError(f"Object not found: {object_key}")
        return file_path.read_bytes()

    async def delete(self, object_key: str) -> None:
        file_path = self.base_path / object_key
        if file_path.exists():
            file_path.unlink()

    async def generate_signed_url(self, object_key: str, expires_in: int = 3600) -> str:
        # Local dev: return a local path URL (not a real signed URL)
        return f"/local/storage/{object_key}"


# Singleton provider instance
storage_provider: StorageProvider = LocalStorageProvider()

"""Resource service layer.

Phase 6: Resources and learning progress
- Module/Chapter/Resource CRUD
- Teacher draft/edit/publish (assigned courses/batches only)
- Admin unpublish
- Teacher deletion request + Admin approval
- Protected student resource access (active enrollment required)
"""

from uuid import UUID
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.modules.resources.models import (
    Module, Chapter, Resource, ResourceDeletionRequest,
)
from app.modules.resources.schemas import (
    ModuleCreate, ModuleUpdate,
    ChapterCreate, ChapterUpdate,
    ResourceCreate, ResourceUpdate,
)
from app.modules.enrollments.service import EnrollmentService


class ModuleService:
    """Business logic for modules."""

    @staticmethod
    async def create_module(
        db: AsyncSession, course_id: UUID, data: ModuleCreate
    ) -> Module:
        """Create a module within a course."""
        module = Module(
            course_id=course_id,
            title=data.title,
            description=data.description,
            sort_order=data.sort_order,
        )
        db.add(module)
        await db.commit()
        await db.refresh(module)
        return module

    @staticmethod
    async def get_module(db: AsyncSession, module_id: UUID) -> Module | None:
        """Get a module by ID."""
        result = await db.execute(select(Module).where(Module.id == module_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def list_modules(
        db: AsyncSession, course_id: UUID
    ) -> list[Module]:
        """List modules for a course, ordered by sort_order."""
        result = await db.execute(
            select(Module)
            .where(Module.course_id == course_id)
            .order_by(Module.sort_order)
        )
        return result.scalars().all()

    @staticmethod
    async def update_module(
        db: AsyncSession, module: Module, data: ModuleUpdate
    ) -> Module:
        """Update a module."""
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(module, field, value)
        await db.commit()
        await db.refresh(module)
        return module

    @staticmethod
    async def delete_module(db: AsyncSession, module: Module) -> None:
        """Delete a module (cascades to chapters and resources)."""
        await db.delete(module)
        await db.commit()


class ChapterService:
    """Business logic for chapters."""

    @staticmethod
    async def create_chapter(
        db: AsyncSession, module_id: UUID, data: ChapterCreate
    ) -> Chapter:
        """Create a chapter within a module."""
        chapter = Chapter(
            module_id=module_id,
            title=data.title,
            description=data.description,
            sort_order=data.sort_order,
        )
        db.add(chapter)
        await db.commit()
        await db.refresh(chapter)
        return chapter

    @staticmethod
    async def get_chapter(db: AsyncSession, chapter_id: UUID) -> Chapter | None:
        """Get a chapter by ID."""
        result = await db.execute(select(Chapter).where(Chapter.id == chapter_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def list_chapters(
        db: AsyncSession, module_id: UUID
    ) -> list[Chapter]:
        """List chapters for a module, ordered by sort_order."""
        result = await db.execute(
            select(Chapter)
            .where(Chapter.module_id == module_id)
            .order_by(Chapter.sort_order)
        )
        return result.scalars().all()

    @staticmethod
    async def update_chapter(
        db: AsyncSession, chapter: Chapter, data: ChapterUpdate
    ) -> Chapter:
        """Update a chapter."""
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(chapter, field, value)
        await db.commit()
        await db.refresh(chapter)
        return chapter

    @staticmethod
    async def delete_chapter(db: AsyncSession, chapter: Chapter) -> None:
        """Delete a chapter (cascades to resources)."""
        await db.delete(chapter)
        await db.commit()


class ResourceService:
    """Business logic for resources."""

    @staticmethod
    async def create_resource(
        db: AsyncSession, data: ResourceCreate, uploader_id: UUID
    ) -> Resource:
        """Create a draft resource (teacher upload)."""
        resource = Resource(
            course_id=UUID(data.course_id),
            batch_id=UUID(data.batch_id) if data.batch_id else None,
            module_id=UUID(data.module_id) if data.module_id else None,
            chapter_id=UUID(data.chapter_id) if data.chapter_id else None,
            title=data.title,
            description=data.description,
            type=data.type,
            external_url=data.external_url,
            uploader_id=uploader_id,
            status="draft",
            is_published=False,
        )
        db.add(resource)
        try:
            await db.commit()
            await db.refresh(resource)
            return resource
        except IntegrityError:
            await db.rollback()
            raise ValueError("Resource could not be created")

    @staticmethod
    async def get_resource(db: AsyncSession, resource_id: UUID) -> Resource | None:
        """Get a resource by ID."""
        result = await db.execute(select(Resource).where(Resource.id == resource_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def list_resources(
        db: AsyncSession,
        course_id: UUID | None = None,
        batch_id: UUID | None = None,
        module_id: UUID | None = None,
        chapter_id: UUID | None = None,
        published_only: bool = False,
    ) -> list[Resource]:
        """List resources with optional filters."""
        query = select(Resource)
        if course_id is not None:
            query = query.where(Resource.course_id == course_id)
        if batch_id is not None:
            query = query.where(Resource.batch_id == batch_id)
        if module_id is not None:
            query = query.where(Resource.module_id == module_id)
        if chapter_id is not None:
            query = query.where(Resource.chapter_id == chapter_id)
        if published_only:
            query = query.where(Resource.is_published == True)  # noqa: E712
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def update_resource(
        db: AsyncSession, resource: Resource, data: ResourceUpdate
    ) -> Resource:
        """Update a resource (teacher can edit own drafts)."""
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(resource, field, value)
        await db.commit()
        await db.refresh(resource)
        return resource

    @staticmethod
    async def publish_resource(
        db: AsyncSession, resource: Resource
    ) -> Resource:
        """Teacher publishes a draft resource."""
        if resource.status != "draft":
            raise ValueError("Only draft resources can be published")
        resource.status = "published"
        resource.is_published = True
        await db.commit()
        await db.refresh(resource)
        return resource

    @staticmethod
    async def unpublish_resource(
        db: AsyncSession, resource: Resource
    ) -> Resource:
        """Admin unpublishes a resource (takes effect immediately)."""
        resource.status = "unpublished"
        resource.is_published = False
        await db.commit()
        await db.refresh(resource)
        return resource

    @staticmethod
    async def delete_resource(
        db: AsyncSession, resource: Resource
    ) -> None:
        """Admin deletes a resource (requires approval via deletion request)."""
        await db.delete(resource)
        await db.commit()

    @staticmethod
    async def check_student_resource_access(
        db: AsyncSession,
        student_profile_id: UUID,
        resource_id: UUID,
    ) -> bool:
        """Check if a student can access a resource.

        Access requires:
        1. Resource is published
        2. Student has an active enrollment covering the resource's course
        3. If resource is batch-restricted, student must be enrolled in that batch
        """
        resource = await ResourceService.get_resource(db, resource_id)
        if resource is None:
            return False
        if not resource.is_published or resource.status != "published":
            return False

        # Check course enrollment
        has_access = await EnrollmentService.check_enrollment_access(
            db, student_profile_id, resource.course_id
        )
        if not has_access:
            return False

        # If batch-restricted, check batch enrollment
        if resource.batch_id is not None:
            has_access = await EnrollmentService.check_enrollment_access(
                db, student_profile_id, resource.course_id, resource.batch_id
            )
            if not has_access:
                return False

        return True

    @staticmethod
    async def get_download_url(
        db: AsyncSession, resource_id: UUID
    ) -> str | None:
        """Get the download URL for a resource (PDF, image, assignment).

        Only returns URL if resource is published and accessible.
        """
        resource = await ResourceService.get_resource(db, resource_id)
        if resource is None:
            return None
        if not resource.is_published or resource.status != "published":
            return None
        return resource.file_url


class ResourceDeletionService:
    """Business logic for resource deletion requests."""

    @staticmethod
    async def request_deletion(
        db: AsyncSession,
        resource_id: UUID,
        requested_by: UUID,
        reason: str | None = None,
    ) -> ResourceDeletionRequest:
        """Teacher requests deletion of a resource."""
        resource = await ResourceService.get_resource(db, resource_id)
        if resource is None:
            raise ValueError("Resource not found")

        # Check if a pending request already exists
        existing = await db.execute(
            select(ResourceDeletionRequest).where(
                ResourceDeletionRequest.resource_id == resource_id,
                ResourceDeletionRequest.status == "pending",
            )
        )
        if existing.scalar_one_or_none():
            raise ValueError("A deletion request is already pending for this resource")

        request = ResourceDeletionRequest(
            resource_id=resource_id,
            requested_by=requested_by,
            reason=reason,
            status="pending",
        )
        db.add(request)
        await db.commit()
        await db.refresh(request)
        return request

    @staticmethod
    async def get_deletion_request(
        db: AsyncSession, request_id: UUID
    ) -> ResourceDeletionRequest | None:
        """Get a deletion request by ID."""
        result = await db.execute(
            select(ResourceDeletionRequest).where(
                ResourceDeletionRequest.id == request_id
            )
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_deletion_requests(
        db: AsyncSession, status: str | None = None
    ) -> list[ResourceDeletionRequest]:
        """List deletion requests, optionally filtered by status."""
        query = select(ResourceDeletionRequest)
        if status is not None:
            query = query.where(ResourceDeletionRequest.status == status)
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def decide_deletion_request(
        db: AsyncSession,
        request_id: UUID,
        decision: str,
        decided_by: UUID,
    ) -> ResourceDeletionRequest:
        """Admin approves or rejects a resource deletion request."""
        request = await ResourceDeletionService.get_deletion_request(db, request_id)
        if request is None:
            raise ValueError("Deletion request not found")

        if decision not in ("approved", "rejected"):
            raise ValueError("Decision must be 'approved' or 'rejected'")

        request.status = decision
        request.decided_by = decided_by
        request.decided_at = datetime.now(timezone.utc)

        # If approved, soft-delete the resource
        if decision == "approved":
            resource = await ResourceService.get_resource(db, request.resource_id)
            if resource:
                resource.status = "deleted"
                resource.is_published = False
                await db.commit()

        await db.refresh(request)
        return request

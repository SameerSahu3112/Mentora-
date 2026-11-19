"""Public content service layer.

Phase 9: Notifications and public content
- About Us content (founder profiles - placeholders until verified)
- Testimonials (consent-controlled)
- Contact / Help content
"""

from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.modules.public_content.models import AboutUsContent, Testimonial, ContactContent
from app.modules.public_content.schemas import (
    AboutUsContentCreate, AboutUsContentUpdate,
    TestimonialCreate, TestimonialUpdate,
    ContactContentCreate, ContactContentUpdate,
)


class AboutUsContentService:
    """Business logic for About Us content."""

    @staticmethod
    async def get_content(
        db: AsyncSession, section: str
    ) -> AboutUsContent | None:
        """Get About Us content by section."""
        result = await db.execute(
            select(AboutUsContent).where(AboutUsContent.section == section)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_content(
        db: AsyncSession, verified_only: bool = False
    ) -> list[AboutUsContent]:
        """List all About Us content."""
        query = select(AboutUsContent)
        if verified_only:
            query = query.where(AboutUsContent.is_verified == True)  # noqa: E712
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def create_content(
        db: AsyncSession, data: AboutUsContentCreate, updated_by: UUID
    ) -> AboutUsContent:
        """Create About Us content section."""
        content = AboutUsContent(
            section=data.section,
            title=data.title,
            content=data.content,
            is_verified=data.is_verified,
            updated_by=updated_by,
        )
        db.add(content)
        try:
            await db.commit()
            await db.refresh(content)
            return content
        except IntegrityError:
            await db.rollback()
            raise ValueError("Content already exists for this section")

    @staticmethod
    async def update_content(
        db: AsyncSession,
        section: str,
        data: AboutUsContentUpdate,
        updated_by: UUID,
    ) -> AboutUsContent:
        """Update About Us content section."""
        content = await AboutUsContentService.get_content(db, section)
        if content is None:
            raise ValueError(f"Content section '{section}' not found")

        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(content, field, value)
        content.updated_by = updated_by

        await db.commit()
        await db.refresh(content)
        return content


class TestimonialService:
    """Business logic for testimonials (consent-controlled)."""

    @staticmethod
    async def create_testimonial(
        db: AsyncSession, data: TestimonialCreate, updated_by: UUID
    ) -> Testimonial:
        """Create a testimonial."""
        testimonial = Testimonial(
            student_name=data.student_name,
            student_class=data.student_class,
            course_name=data.course_name,
            content=data.content,
            photo_url=data.photo_url,
            is_published=data.is_published,
            consent_obtained=data.consent_obtained,
            updated_by=updated_by,
        )
        db.add(testimonial)
        try:
            await db.commit()
            await db.refresh(testimonial)
            return testimonial
        except IntegrityError:
            await db.rollback()
            raise ValueError("Testimonial could not be created")

    @staticmethod
    async def get_testimonial(db: AsyncSession, testimonial_id: UUID) -> Testimonial | None:
        """Get a testimonial by ID."""
        result = await db.execute(
            select(Testimonial).where(Testimonial.id == testimonial_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_testimonials(
        db: AsyncSession, published_only: bool = False
    ) -> list[Testimonial]:
        """List testimonials.

        Only published testimonials with consent are shown publicly.
        """
        query = select(Testimonial)
        if published_only:
            query = query.where(
                Testimonial.is_published == True,  # noqa: E712
                Testimonial.consent_obtained == True,  # noqa: E712
            )
        result = await db.execute(
            query.order_by(Testimonial.created_at.desc())
        )
        return result.scalars().all()

    @staticmethod
    async def update_testimonial(
        db: AsyncSession,
        testimonial_id: UUID,
        data: TestimonialUpdate,
        updated_by: UUID,
    ) -> Testimonial:
        """Update a testimonial."""
        testimonial = await TestimonialService.get_testimonial(db, testimonial_id)
        if testimonial is None:
            raise ValueError("Testimonial not found")

        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(testimonial, field, value)
        testimonial.updated_by = updated_by

        await db.commit()
        await db.refresh(testimonial)
        return testimonial


class ContactContentService:
    """Business logic for Contact / Help content."""

    @staticmethod
    async def get_content(
        db: AsyncSession, section: str
    ) -> ContactContent | None:
        """Get Contact content by section."""
        result = await db.execute(
            select(ContactContent).where(ContactContent.section == section)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def list_content(
        db: AsyncSession, active_only: bool = False
    ) -> list[ContactContent]:
        """List all Contact content."""
        query = select(ContactContent)
        if active_only:
            query = query.where(ContactContent.is_active == True)  # noqa: E712
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def create_content(
        db: AsyncSession, data: ContactContentCreate, updated_by: UUID
    ) -> ContactContent:
        """Create Contact content section."""
        content = ContactContent(
            section=data.section,
            title=data.title,
            content=data.content,
            is_active=data.is_active,
            updated_by=updated_by,
        )
        db.add(content)
        try:
            await db.commit()
            await db.refresh(content)
            return content
        except IntegrityError:
            await db.rollback()
            raise ValueError("Content already exists for this section")

    @staticmethod
    async def update_content(
        db: AsyncSession,
        section: str,
        data: ContactContentUpdate,
        updated_by: UUID,
    ) -> ContactContent:
        """Update Contact content section."""
        content = await ContactContentService.get_content(db, section)
        if content is None:
            raise ValueError(f"Content section '{section}' not found")

        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(content, field, value)
        content.updated_by = updated_by

        await db.commit()
        await db.refresh(content)
        return content

"""Public content routes.

Phase 9: Notifications and public content
- Public: GET /public/about-us, GET /public/testimonials, GET /public/contact
- Admin: PUT /admin/content/about-us/{section}, PUT /admin/content/testimonials/{id}, PUT /admin/content/contact/{section}
"""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.public_content.models import AboutUsContent, Testimonial, ContactContent
from app.modules.public_content.schemas import (
    AboutUsContentCreate, AboutUsContentUpdate, AboutUsContentResponse,
    TestimonialCreate, TestimonialUpdate, TestimonialResponse,
    ContactContentCreate, ContactContentUpdate, ContactContentResponse,
)
from app.modules.public_content.service import (
    AboutUsContentService, TestimonialService, ContactContentService,
)

router = APIRouter(prefix="/content", tags=["public-content"])


# ------------------------------------------------------------------
# Public routes (no authentication required)
# ------------------------------------------------------------------

@router.get("/public/about-us", response_model=list[AboutUsContentResponse])
async def public_about_us(
    db: AsyncSession = Depends(get_db),
):
    """Get About Us content (public)."""
    return await AboutUsContentService.list_content(db, verified_only=True)


@router.get("/public/testimonials", response_model=list[TestimonialResponse])
async def public_testimonials(
    db: AsyncSession = Depends(get_db),
):
    """Get published testimonials with consent (public)."""
    return await TestimonialService.list_testimonials(db, published_only=True)


@router.get("/public/contact", response_model=list[ContactContentResponse])
async def public_contact(
    db: AsyncSession = Depends(get_db),
):
    """Get Contact / Help content (public)."""
    return await ContactContentService.list_content(db, active_only=True)


# ------------------------------------------------------------------
# Admin routes (require admin role — enforced in Phase 2 middleware)
# ------------------------------------------------------------------

@router.put("/admin/about-us/{section}", response_model=AboutUsContentResponse)
async def admin_update_about_us(
    section: str,
    data: AboutUsContentUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Admin: update About Us content section."""
    # Phase 9: updated_by comes from session/auth middleware.
    # Placeholder: using a system UUID until auth middleware is wired.
    updated_by = UUID("00000000-0000-0000-0000-000000000001")
    try:
        return await AboutUsContentService.update_content(db, section, data, updated_by)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))


@router.post(
    "/admin/testimonials",
    response_model=TestimonialResponse,
    status_code=status.HTTP_201_CREATED,
)
async def admin_create_testimonial(
    data: TestimonialCreate,
    db: AsyncSession = Depends(get_db),
):
    """Admin: create a testimonial."""
    # Phase 9: updated_by comes from session/auth middleware.
    updated_by = UUID("00000000-0000-0000-0000-000000000001")
    try:
        return await TestimonialService.create_testimonial(db, data, updated_by)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


@router.put("/admin/testimonials/{testimonial_id}", response_model=TestimonialResponse)
async def admin_update_testimonial(
    testimonial_id: UUID,
    data: TestimonialUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Admin: update a testimonial."""
    # Phase 9: updated_by comes from session/auth middleware.
    updated_by = UUID("00000000-0000-0000-0000-000000000001")
    try:
        return await TestimonialService.update_testimonial(
            db, testimonial_id, data, updated_by
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))


@router.put("/admin/contact/{section}", response_model=ContactContentResponse)
async def admin_update_contact(
    section: str,
    data: ContactContentUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Admin: update Contact / Help content section."""
    # Phase 9: updated_by comes from session/auth middleware.
    updated_by = UUID("00000000-0000-0000-0000-000000000001")
    try:
        return await ContactContentService.update_content(db, section, data, updated_by)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))

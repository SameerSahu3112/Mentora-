"""Course service layer.

Phase 3: Courses, batches, teacher assignment
- Course CRUD
- Public course listing
- Seed data for initial courses (Rise, Spark, Apex)
"""

from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.exc import IntegrityError

from app.modules.courses.models import Course
from app.modules.courses.schemas import CourseCreate, CourseUpdate
from app.modules.batches.models import Batch


class CourseService:
    """Business logic for courses."""

    @staticmethod
    async def create_course(db: AsyncSession, data: CourseCreate) -> Course:
        """Create a new course."""
        course = Course(
            name=data.name,
            exam_target=data.exam_target,
            exam_date=data.exam_date,
            price=data.price,
            description=data.description,
            is_active=data.is_active,
        )
        db.add(course)
        try:
            await db.commit()
            await db.refresh(course)
            return course
        except IntegrityError:
            await db.rollback()
            raise ValueError(f"Course with name '{data.name}' already exists")

    @staticmethod
    async def get_course(db: AsyncSession, course_id: UUID) -> Course | None:
        """Get a course by ID."""
        result = await db.execute(select(Course).where(Course.id == course_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def get_course_by_name(db: AsyncSession, name: str) -> Course | None:
        """Get a course by name."""
        result = await db.execute(select(Course).where(Course.name == name))
        return result.scalar_one_or_none()

    @staticmethod
    async def list_courses(db: AsyncSession, active_only: bool = False) -> list[Course]:
        """List all courses, optionally filtered to active only."""
        query = select(Course)
        if active_only:
            query = query.where(Course.is_active == True)  # noqa: E712
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def update_course(
        db: AsyncSession, course: Course, data: CourseUpdate
    ) -> Course:
        """Update a course. Price changes must not silently alter quoted prices."""
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(course, field, value)
        await db.commit()
        await db.refresh(course)
        return course

    @staticmethod
    async def delete_course(db: AsyncSession, course: Course) -> None:
        """Delete a course (critical action — two-Admin approval in Phase 8)."""
        await db.delete(course)
        await db.commit()

    @staticmethod
    async def seed_initial_courses(db: AsyncSession) -> None:
        """Seed the three initial JEE courses if they don't exist.

        - Rise: JEE Main January, ₹299
        - Spark: JEE Main April, ₹499
        - Apex: JEE Advanced, ₹699
        """
        initial = [
            {
                "name": "Rise",
                "exam_target": "JEE Main January",
                "price": 299.00,
            },
            {
                "name": "Spark",
                "exam_target": "JEE Main April",
                "price": 499.00,
            },
            {
                "name": "Apex",
                "exam_target": "JEE Advanced",
                "price": 699.00,
            },
        ]

        for data in initial:
            existing = await CourseService.get_course_by_name(db, data["name"])
            if existing:
                continue
            course = Course(
                name=data["name"],
                exam_target=data["exam_target"],
                price=data["price"],
                is_active=True,
            )
            db.add(course)

        await db.commit()

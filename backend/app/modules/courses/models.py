"""Course domain models.

Phase 3: Courses, batches, teacher assignment
- courses: JEE courses (Rise, Spark, Apex) with editable exam date and price
"""

import uuid
from sqlalchemy import (
    Column, String, Date, Numeric, Text, Boolean, DateTime, CheckConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Course(Base):
    """JEE preparation course."""

    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False, unique=True, index=True)
    exam_target = Column(String(100), nullable=False)
    exam_date = Column(Date, nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    batches = relationship("Batch", back_populates="course", cascade="all, delete-orphan")
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan")

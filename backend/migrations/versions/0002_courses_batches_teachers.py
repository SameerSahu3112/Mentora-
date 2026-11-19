"""Courses, batches, and teacher assignments

Revision ID: 0002_courses_batches_teachers
Revises: 0001_identity_and_access_control
Create Date: 2026-11-19 23:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0002_courses_batches_teachers"
down_revision: Union[str, None] = "0001_identity_and_access_control"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # courses table
    op.create_table(
        "courses",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("exam_target", sa.String(length=100), nullable=False),
        sa.Column("exam_date", sa.Date(), nullable=True),
        sa.Column("price", sa.Numeric(precision=10, scale=2), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name", name="uq_courses_name"),
    )
    op.create_index(op.f("ix_courses_name"), "courses", ["name"], unique=True)

    # batches table
    op.create_table(
        "batches",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("course_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("start_date", sa.Date(), nullable=False),
        sa.Column("end_date", sa.Date(), nullable=False),
        sa.Column("weekly_schedule", postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column("max_capacity", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default=sa.text("'active'::character varying")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint("max_capacity > 0", name="chk_batches_max_capacity_positive"),
        sa.CheckConstraint(
            "status IN ('active', 'full', 'closed', 'archived')",
            name="chk_batches_status",
        ),
        sa.ForeignKeyConstraint(["course_id"], ["courses.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_batches_course_id"), "batches", ["course_id"])
    op.create_index(op.f("ix_batches_status"), "batches", ["status"])

    # batch_teachers table (many-to-many)
    op.create_table(
        "batch_teachers",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("batch_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("teacher_profile_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("assigned_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("assigned_by", postgresql.UUID(as_uuid=True), nullable=True),
        sa.ForeignKeyConstraint(["assigned_by"], ["users.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["batch_id"], ["batches.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["teacher_profile_id"], ["teacher_profiles.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_batch_teachers_batch_id"), "batch_teachers", ["batch_id"])
    op.create_index(
        op.f("ix_batch_teachers_teacher_profile_id"),
        "batch_teachers",
        ["teacher_profile_id"],
    )
    op.create_unique_constraint(
        "uq_batch_teachers_batch_teacher",
        "batch_teachers",
        ["batch_id", "teacher_profile_id"],
    )

    # ------------------------------------------------------------------
    # Seed initial courses: Rise, Spark, Apex
    # ------------------------------------------------------------------
    courses_table = sa.table(
        "courses",
        sa.column("id", postgresql.UUID(as_uuid=True)),
        sa.column("name", sa.String),
        sa.Column("exam_target", sa.String),
        sa.Column("exam_date", sa.Date),
        sa.Column("price", sa.Numeric(10, 2)),
        sa.Column("description", sa.Text),
        sa.Column("is_active", sa.Boolean),
        sa.Column("created_at", sa.DateTime(timezone=True)),
        sa.Column("updated_at", sa.DateTime(timezone=True)),
    )

    import uuid as _uuid

    now = sa.text("now()")
    rise_id = str(_uuid.uuid4())
    spark_id = str(_uuid.uuid4())
    apex_id = str(_uuid.uuid4())

    op.bulk_insert(
        courses_table,
        [
            {
                "id": rise_id,
                "name": "Rise",
                "exam_target": "JEE Main January",
                "exam_date": None,
                "price": 299.00,
                "description": None,
                "is_active": True,
                "created_at": now,
                "updated_at": now,
            },
            {
                "id": spark_id,
                "name": "Spark",
                "exam_target": "JEE Main April",
                "exam_date": None,
                "price": 499.00,
                "description": None,
                "is_active": True,
                "created_at": now,
                "updated_at": now,
            },
            {
                "id": apex_id,
                "name": "Apex",
                "exam_target": "JEE Advanced",
                "exam_date": None,
                "price": 699.00,
                "description": None,
                "is_active": True,
                "created_at": now,
                "updated_at": now,
            },
        ],
    )


def downgrade() -> None:
    op.drop_table("batch_teachers")
    op.drop_table("batches")
    op.drop_table("courses")

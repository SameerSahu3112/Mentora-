"""Mentorship schedules, sessions, bookings, and attendance

Revision ID: 0006_mentorship_attendance
Revises: 0005_resources_progress
Create Date: 2026-11-20 00:15:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0006_mentorship_attendance"
down_revision: Union[str, None] = "0005_resources_progress"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # weekly_mentorship_schedules table
    op.create_table(
        "weekly_mentorship_schedules",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("batch_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("day_of_week", sa.Integer(), nullable=False),
        sa.Column("start_time", sa.Time(), nullable=False),
        sa.Column("duration_minutes", sa.Integer(), nullable=False, server_default=sa.text("60")),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_by", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "day_of_week BETWEEN 0 AND 6",
            name="chk_weekly_mentorship_schedules_day_of_week",
        ),
        sa.CheckConstraint(
            "duration_minutes > 0",
            name="chk_weekly_mentorship_schedules_duration",
        ),
        sa.ForeignKeyConstraint(["batch_id"], ["batches.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["created_by"], ["users.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_weekly_mentorship_schedules_batch_id"),
        "weekly_mentorship_schedules",
        ["batch_id"],
    )

    # weekly_mentorship_sessions table
    op.create_table(
        "weekly_mentorship_sessions",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("schedule_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("batch_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("session_date", sa.Date(), nullable=False),
        sa.Column("start_time", sa.DateTime(timezone=True), nullable=False),
        sa.Column("end_time", sa.DateTime(timezone=True), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default=sa.text("'upcoming'::character varying")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "status IN ('upcoming', 'completed', 'cancelled')",
            name="chk_weekly_mentorship_sessions_status",
        ),
        sa.ForeignKeyConstraint(["batch_id"], ["batches.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["schedule_id"], ["weekly_mentorship_schedules.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_weekly_mentorship_sessions_schedule_id"),
        "weekly_mentorship_sessions",
        ["schedule_id"],
    )
    op.create_index(
        op.f("ix_weekly_mentorship_sessions_batch_id"),
        "weekly_mentorship_sessions",
        ["batch_id"],
    )

    # mentorship_bookings table
    op.create_table(
        "mentorship_bookings",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("student_profile_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("mentor_profile_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("enrollment_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("preferred_time", sa.DateTime(timezone=True), nullable=False),
        sa.Column("confirmed_time", sa.DateTime(timezone=True), nullable=True),
        sa.Column("status", sa.String(length=32), nullable=False, server_default=sa.text("'requested'::character varying")),
        sa.Column("reason", sa.String(length=1000), nullable=True),
        sa.Column("attended", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "status IN ('requested', 'approved', 'rejected', 'cancelled', 'completed')",
            name="chk_mentorship_bookings_status",
        ),
        sa.ForeignKeyConstraint(
            ["enrollment_id"], ["enrollments.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["mentor_profile_id"], ["teacher_profiles.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["student_profile_id"], ["student_profiles.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_mentorship_bookings_student_profile_id"),
        "mentorship_bookings",
        ["student_profile_id"],
    )
    op.create_index(
        op.f("ix_mentorship_bookings_mentor_profile_id"),
        "mentorship_bookings",
        ["mentor_profile_id"],
    )
    op.create_index(
        op.f("ix_mentorship_bookings_enrollment_id"),
        "mentorship_bookings",
        ["enrollment_id"],
    )

    # mentorship_attendance table
    op.create_table(
        "mentorship_attendance",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("weekly_session_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("booking_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("student_profile_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("marked_by", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default=sa.text("'present'::character varying")),
        sa.Column("marked_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "status IN ('present', 'absent', 'excused')",
            name="chk_mentorship_attendance_status",
        ),
        sa.CheckConstraint(
            "((weekly_session_id IS NOT NULL) AND (booking_id IS NULL)) OR ((weekly_session_id IS NULL) AND (booking_id IS NOT NULL))",
            name="chk_mentorship_attendance_either_session_or_booking",
        ),
        sa.ForeignKeyConstraint(["booking_id"], ["mentorship_bookings.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["marked_by"], ["users.id"], ondelete="SET NULL"
        ),
        sa.ForeignKeyConstraint(
            ["student_profile_id"], ["student_profiles.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["weekly_session_id"], ["weekly_mentorship_sessions.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_mentorship_attendance_weekly_session_id"),
        "mentorship_attendance",
        ["weekly_session_id"],
    )
    op.create_index(
        op.f("ix_mentorship_attendance_booking_id"),
        "mentorship_attendance",
        ["booking_id"],
    )
    op.create_index(
        op.f("ix_mentorship_attendance_student_profile_id"),
        "mentorship_attendance",
        ["student_profile_id"],
    )


def downgrade() -> None:
    op.drop_table("mentorship_attendance")
    op.drop_table("mentorship_bookings")
    op.drop_table("weekly_mentorship_sessions")
    op.drop_table("weekly_mentorship_schedules")

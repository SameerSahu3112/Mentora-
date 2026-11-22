"""Add droppers option and default capacity to batches

Revision ID: 0009_droppers_option
Revises: 0008_public_content
Create Date: 2026-11-22 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0009_droppers_option"
down_revision: Union[str, None] = "0008_public_content"
branch_labels: Union[str, None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add droppers column to batches table
    op.add_column(
        "batches",
        sa.Column(
            "is_droppers_batch",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
    )
    # Update default capacity to 50 for all existing batches
    op.execute("ALTER TABLE batches ALTER COLUMN max_capacity SET DEFAULT 50")
    # Update existing batches to have capacity 50 if they don't have one set
    op.execute("UPDATE batches SET max_capacity = 50 WHERE max_capacity IS NULL OR max_capacity = 0")


def downgrade() -> None:
    op.drop_column("batches", "is_droppers_batch")
    op.execute("ALTER TABLE batches ALTER COLUMN max_capacity DROP DEFAULT")


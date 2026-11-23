from datetime import date
from uuid import uuid4

from app.modules.batches.schemas import BatchCreate


def test_batch_create_parses_course_id_as_uuid():
    course_id = uuid4()

    batch = BatchCreate(
        course_id=course_id,
        name="Rise 1.0",
        start_date=date(2026, 12, 1),
        end_date=date(2027, 1, 31),
        max_capacity=30,
    )

    assert batch.course_id == course_id

from datetime import datetime, timezone
from uuid import uuid4

import app.main
from app.modules.courses.models import Course
from app.modules.courses.schemas import CoursePublic, CourseResponse


def test_course_responses_serialize_uuid_ids():
    course_id = uuid4()
    now = datetime.now(timezone.utc)
    course = Course(
        id=course_id,
        name="Rise",
        exam_target="JEE Main January",
        price=299,
        is_active=True,
        created_at=now,
        updated_at=now,
    )

    public = CoursePublic.model_validate(course)
    full = CourseResponse.model_validate(course)

    assert public.model_dump(mode="json")["id"] == str(course_id)
    assert full.model_dump(mode="json")["id"] == str(course_id)

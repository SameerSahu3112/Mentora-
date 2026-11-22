import app.main
from sqlalchemy.orm import configure_mappers


def test_all_orm_mappers_configure():
    configure_mappers()

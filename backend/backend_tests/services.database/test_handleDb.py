import pytest

@pytest.fixture
def dbHandler():
    from services.database.handler.handleDb import handleDb
    return handleDb()

def test_db(dbHandler):
    assert (dbHandler.getOutput().get("database") != None)

import pytest

@pytest.fixture
def dbHandler():
    from handler.handleDb import handleDb
    return handleDb()

def test_db(dbHandler):
    assertTrue(dbHandler.getOutput().get("database") != None)

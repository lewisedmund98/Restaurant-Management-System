import pytest


@pytest.fixture
def idClass():
    from frameworks.idGenerator.id import id
    return id()


def testID(idClass):
    assert isinstance(idClass.getID("user"), str)

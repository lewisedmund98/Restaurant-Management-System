import pytest


@pytest.fixture
def itemClass():
    from frameworks.item.item import item
    return item()


def testLoad(itemClass):
    assert itemClass.load(1) is None


def testGetData(itemClass):
    itemClass.load(1) is None
    assert isinstance(itemClass.get(), dict)

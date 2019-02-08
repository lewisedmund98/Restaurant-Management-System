import pytest

@pytest.fixture
def itemClass():
    from frameworks.item.item import item
    return item()

def testLoad(itemClass):
    assert itemClass.load(1) == None

def testGetData(itemClass):
    itemClass.load(1) == None
    assert isinstance(itemClass.get(), dict)
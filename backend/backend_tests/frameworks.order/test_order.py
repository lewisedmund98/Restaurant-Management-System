import pytest
# noinspection PyUnresolvedReferences
from frameworks.order.order import order


@pytest.fixture
def orderClass():  # does class exist?
    return order()


#def testConstructor():  # does constructor work?
#    assert order("aaa", "aaa", "aaa", "aaa", "aaa", "aaa", )


#def testConstructor():  # does constructor work?
#    assert order("aaa", "aaa", "aaa", "aaa", "aaa", "aaa", )


#def testID():
#    print(order.returnID())
#    assert isinstance(order.returnID(), str)


def testgetData():
    assert order.getData()

import pytest
# noinspection PyUnresolvedReferences
from frameworks.order.order import order


@pytest.fixture
def orderClass():  # does class exist?
    return order()


# def testConstructor():  # does constructor work?
#    assert order("aaa", "aaa", "aaa", "aaa", "aaa", "aaa", )

@staticmethod
def testID():
    print(order.returnID()) # does the ID generation method work?
    assert isinstance(order.returnID(), str)


@staticmethod
def testGetData():  # does the getData method exist?
    assert order.getData()

@staticmethod
def testGetStatus():  # does the getStatus method exist?
    assert order.getStatus()

@staticmethod
def testLoadStatusOfOrder():  # does the loadStatusOfOrder method exist?
    assert order.loadStatusOfOrder("AHHHHHHH")

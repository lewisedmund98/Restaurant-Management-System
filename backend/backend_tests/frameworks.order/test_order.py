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
def testGetOrderInfo():  # does the getOrderInfo method exist?
    assert order.getOrderInfo()

@staticmethod
def testGetOrderStatus():  # does the getOrderStatus method exist?
    assert order.getOrderStatus()

@staticmethod
def testLoadStatusOfOrder():  # does the loadStatusOfOrder method exist?
    assert order.loadStatusOfOrder("AHHHHHHH")

@staticmethod
def testLoadInfoOfOrder():  # does the loadInformationOfOrder method exist?
    assert order.loadInformationOfOrder("AHHHHHHH")

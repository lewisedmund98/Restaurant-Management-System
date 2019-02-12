import pytest
# noinspection PyUnresolvedReferences
from frameworks.order.order import order


@pytest.fixture
def orderClass():  # does class exist?
    return order()

def testID():
    print(order.returnID()) # does the ID generation method work?
    assert isinstance(order.returnID(), str)

def testGetOrderInfo():  # does the getOrderInfo method exist?
    assert order.getOrderInfo()

def testGetOrderStatus():  # does the getOrderStatus method exist?
    assert order.getOrderStatus()

def testLoadStatusOfOrder():  # does the loadStatusOfOrder method exist?
    assert order.loadStatusOfOrder("AHHHHHHH")

def testLoadInfoOfOrder():  # does the loadInformationOfOrder method exist?
    assert order.loadInformationOfOrder("AHHHHHHH")

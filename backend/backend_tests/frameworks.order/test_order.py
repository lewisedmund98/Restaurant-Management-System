import pytest
# noinspection PyUnresolvedReferences
from frameworks.order.order import order


@pytest.fixture
def orderClass():  # does class exist?
    return order()

def testGetOrderInfo(orderClass):  # does the getOrderInfo method exist?
    assert isinstance(orderClass.getOrderInfo(), dict)

def testGetOrderStatus(orderClass):  # does the getOrderStatus method exist?
    assert isinstance(orderClass.getOrderStatus(), dict)

def testLoadStatusOfOrder(orderClass):  # does the loadStatusOfOrder method exist?
    assert orderClass.loadStatusOfOrder("ordercjs1sk6zd0000adaxgzznu4dh") == True

def testLoadInfoOfOrder(orderClass):  # does the loadInformationOfOrder method exist?
    assert orderClass.loadInformationOfOrder("ordercjs1sk6zd0000adaxgzznu4dh") == True

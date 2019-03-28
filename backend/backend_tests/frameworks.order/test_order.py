import pytest
# noinspection PyUnresolvedReferences
from frameworks.order.order import order

@pytest.fixture
def orderClass():  # does class exist?
    return order()

@pytest.fixture
def createOrder(orderClass):
    return orderClass.createOrder("Test Order", "test@test.com", 1, [1,2])

def testLoadStatusOfOrder(orderClass, createOrder):  # does the loadStatusOfOrder method exist?
    assert orderClass.loadOrderHistory(createOrder) == True
    assert isinstance(orderClass.getOrderStatus(), dict)

def testloadOrderInfo(orderClass, createOrder):  # does the loadInformationOfOrder method exist?
    assert orderClass.loadOrderInfo(createOrder) == True
    assert isinstance(orderClass.getOrderInfo(), dict)
import pytest
# noinspection PyUnresolvedReferences
from frameworks.order.order import order


@pytest.fixture
def orderClass():  # does class exist?
    return order()

def testLoadStatusOfOrder(orderClass):  # does the loadStatusOfOrder method exist?
    assert orderClass.loadOrderStatus("ordercjs1sk6zd0000adaxgzznu4dh") == True
    assert isinstance(orderClass.getOrderStatus(), dict)

def loadOrderInfo(orderClass):  # does the loadInformationOfOrder method exist?
    assert orderClass.loadInformationOfOrder("ordercjs1sk6zd0000adaxgzznu4dh") == True
    assert isinstance(orderClass.getOrderInfo(), dict)
import pytest
# noinspection PyUnresolvedReferences
from frameworks.order.orders import orders


@pytest.fixture
def ordersClass():  
    return orders()

def testOrders(ordersClass):
    assert ordersClass.loadOrders() == True
    assert isinstance(ordersClass.getOrders("completed"), list)
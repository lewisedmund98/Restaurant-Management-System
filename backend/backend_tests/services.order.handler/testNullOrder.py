import pytest
from frameworks.order.orders import orders
from frameworks.order.order import order

@pytest.fixture
def orderClass():  # does class exist?
    return order()


def testNullOrder(orderClass):
    with pytest.raises(Exception) as exc:
            orderClass.__createOrder("Test Order", 12345678911, "test@test.com", 1, [])

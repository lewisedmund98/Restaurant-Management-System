import pytest
from frameworks.order.orders import orders


@pytest.fixture
def createOrder(orderClass):
    with pytest.raises(Exception) as ex:
            orderClass.createOrder("Test Order", 12345678911, "test@test.com", 1, [])

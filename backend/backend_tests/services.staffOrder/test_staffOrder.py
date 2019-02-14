import pytest
from services.staffOrder.handler.staffOrder import staffOrder
from frameworks.order.order import order


@pytest.fixture
# test fixture with instance we pass to each test case
def staffOrderClass():
    order1  = order()
    orderInstance = order1.createOrder("Test Customer", "1 ", "test", 13, "1")
    return staffOrder(order)

# test case 1
def testwaiterConfirm(staffOrderClass):
    assert isinstance(waiterConfirm(), dict)

# test case 2
def testkitchenConfirm(staffOrderClass):
    assert isinstance(kitchenCorfirm(), dict)

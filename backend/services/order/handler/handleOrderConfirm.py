from flask import Request, abort
from frameworks.order.order import order

class handleOrderConfirm:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"order has been confirmed by the waiter"  : self.__waiterConfirmation()}

    def __waiterConfirmation():
        self.order = loadOrderHistory(self.__data['id'], "waiterConfirmed")
        return self.__order.__getWaiterConfirmed()

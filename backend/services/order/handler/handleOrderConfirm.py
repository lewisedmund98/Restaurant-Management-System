from flask import Request, abort
from frameworks.order.order import orders

class handleOrderConfirm:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"order has been confirmed by the waiter"  : self.__getWaiterConfirmed()}

    def __getWaiterConfirmed():

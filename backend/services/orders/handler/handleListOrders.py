from flask import Request, abort
from frameworks.order.orders import orders

class handleListOrders:
    def __init__(self, request):
        self.__orders = orders()
        self.__data = request.get_json()

    def getOutput(self):
        return {"orders": self.__getOrders()}

    def __getOrders(self):
        self.__orders.loadOrders()
        return self.__orders.getOrders()
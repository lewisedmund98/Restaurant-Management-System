from flask import Request, abort
from frameworks.order.orders import orders

class handleListOrders:
    def __init__(self, filter):
        self.__orders = orders()
        self.__filter = filter

    def getOutput(self):
        return {"orders": self.__getOrders()}

    def __getOrders(self):
        self.__orders.loadOrders(self.__filter)
        return self.__orders.getOrders()
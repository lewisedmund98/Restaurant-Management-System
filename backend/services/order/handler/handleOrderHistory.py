from flask import Request, abort
from frameworks.order.order import order

class handleOrderHistory:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"order": self.__getOrder()}

    def __getOrder(self):
        self.__order.loadOrderHistory(self.__data['order_id'])
        return self.__order.getOrderHistory()
from flask import Request, abort
from frameworks.order.order import order

class handleCustomer:
    def __init__(self, request):
        self.__data = request.get_json()
        self.__order = order()

    def getOutput(self):
        return {"result": self.__customerData()}

    def __customerData(self):
        self.__order.loadOrderInfo(self.__data['order_id'])
        return self.__order.getCustomer()
from flask import Request, abort
from frameworks.order.order import order

class handleKitchenComplete:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"confirmed": self.__kitchenComplete()}

    def __kitchenComplete(self):
        return self.__order.kitchenComplete(self.__data['order_id'])
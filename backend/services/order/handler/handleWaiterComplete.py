from flask import Request, abort
from frameworks.order.order import order

class handleWaiterComplete:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"confirmed": self.__waiterComplete()}

    def __waiterComplete(self):
        return self.__order.waiterComplete(self.__data['id'])
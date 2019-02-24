from flask import Request, abort
from frameworks.order.order import order

class handleWaiterConfirm:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"confirmed": self.__waiterConfirmation()}

    def __waiterConfirmation(self):
        return self.__order.waiterConfirm(self.__data['id'])
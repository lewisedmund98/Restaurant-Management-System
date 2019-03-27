from flask import Request, abort
from frameworks.order.order import order
from frameworks.payment.payment import payment

class handleWaiterConfirm:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()
        self.__payment = payment()

    def getOutput(self):
        return {"confirmed": self.__waiterConfirmation()}

    def __waiterConfirmation(self):
        # Try to present 
        self.__payment.submitPresentment(self.__data['order_id'])
        # Then add the waiter confirmation
        return self.__order.waiterConfirm(self.__data['order_id'])
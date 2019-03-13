from flask import Request, abort
from frameworks.payment.payment import payment

class handlePayment:
    def __init__(self, request):
        self.__data = request.get_json()
        self.__payment = payment()

    def getOutput(self):
        return self.__paymentConfirmation()

    def __paymentConfirmation(self):
        # Try to authorise the charge 
        return self.__payment.submitAuthorisation(self.__data['order_id'], self.__data['token_id'])
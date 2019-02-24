from flask import Request, abort
from frameworks.order.order import order
from datetime import datetime  
from datetime import timedelta  

class handleKitchenConfirm:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"confirmed": self.__kitchenConfirmation()}

    def __kitchenConfirmation(self):
        eta = datetime.now() + timedelta(minutes=int(self.__data['eta']))  
        return self.__order.kitchenConfirm(self.__data['id'], eta.timestamp())

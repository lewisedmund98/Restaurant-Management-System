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
        if "eta" in self.__data:
            eta = datetime.now() + timedelta(minutes=int(self.__data['eta']))  
            rval = self.__order.kitchenConfirm(self.__data['id'], eta.timestamp())
        else: 
            eta = None
            rval = self.__order.kitchenConfirm(self.__data['id'])
        
        return rval

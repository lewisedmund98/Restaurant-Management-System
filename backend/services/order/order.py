from flask import abort
from .handler.handleCancelOrder import handleCancelOrder
from .handler.handleCreateOrder import handleCreateOrder
from .handler.handleKitchenComplete import handleKitchenComplete
from .handler.handleKitchenConfirm import handleKitchenConfirm
from .handler.handleOrderHistory import handleOrderHistory
from .handler.handleOrderStatus import handleOrderStatus
from .handler.handleOrderView import handleOrderView
from .handler.handleWaiterComplete import handleWaiterComplete
from .handler.handleWaiterConfirm import handleWaiterConfirm
from .handler.handlePayment import handlePayment
from frameworks.authentication.auth import authentication

class order:
    def __init__(self, request):
        self.__request = request
        self.__auth = authentication(request.get_json()['key'], request.get_json()['secret'])
        self.__newAccessToken = None

        if request.path == "/order/create":
            self.responseObj = handleCreateOrder(request)
        elif request.path == "/order/view":
            self.responseObj = handleOrderView(request)
        elif request.path == "/order/history":
            self.responseObj = handleOrderHistory(request)
        elif request.path == '/order/cancel':
            if self.__checkPermish(0):
                self.responseObj = handleCancelOrder(request)
        elif request.path == "/order/status":
            self.responseObj = handleOrderStatus(request)
        elif request.path == "/order/waiterConfirm":
            if self.__checkPermish(0):
                self.responseObj = handleWaiterConfirm(request)
        elif request.path == "/order/kitchenConfirm":
            if self.__checkPermish(1):
                self.responseObj = handleKitchenConfirm(request)
        elif request.path == "/order/kitchenComplete":
            if self.__checkPermish(1):
                self.responseObj = handleKitchenComplete(request)
        elif request.path == "/order/waiterComplete":
            if self.__checkPermish(0):
                self.responseObj = handleWaiterComplete(request)
        elif(request.path == "/order/payment"):
            self.responseObj = handlePayment(request)
        else:
            self.responseObj = self

    def getResponse(self):
        output = self.responseObj.getOutput()
        if(isinstance(self.__newAccessToken, dict)):
            output.update(self.__newAccessToken)
        return output

    def getOutput(self):
        abort(404)
    
    def __checkPermish(self, level):
        self.__newAccessToken = self.__auth.authenticateRequest(self.__request.get_json()['access_token'], self.__request.get_json()['id'], level)
        if(isinstance(self.__newAccessToken, dict)):
            return True
        else:
            abort(403)

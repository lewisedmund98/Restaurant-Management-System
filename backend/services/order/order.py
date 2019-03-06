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


class order:
    def __init__(self, request):
        #self.__auth = authentication()
        if request.path == "/order/create":
            self.responseObj = handleCreateOrder(request)
        elif request.path == "/order/view":
            self.responseObj = handleOrderView(request)
        elif request.path == "/order/history":
            self.responseObj = handleOrderHistory(request)
        elif request.path == '/order/cancel':
            self.responseObj = handleCancelOrder(request)
        elif request.path == "/order/status":
            self.responseObj = handleOrderStatus(request)
        elif request.path == "/order/waiterConfirm":
            self.responseObj = handleWaiterConfirm(request)
        elif request.path == "/order/kitchenConfirm":
            self.responseObj = handleKitchenConfirm(request)
        elif request.path == "/order/kitchenComplete":
            self.responseObj = handleKitchenComplete(request)
        elif request.path == "/order/waiterComplete":
            self.responseObj = handleWaiterComplete(request)

        # elif(request.path == "order/payment"):
        #     self.responseObj = handleOrderPayment(request)
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()

    def getOutput(self):
        abort(404)

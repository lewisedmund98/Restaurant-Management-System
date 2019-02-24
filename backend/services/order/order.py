from flask import Request, abort
from frameworks.authentication.auth import authentication
from .handler.handleCreateOrder import handleCreateOrder
from .handler.handleOrderView import handleOrderView
from .handler.handleOrderHistory import handleOrderHistory
from .handler.handleOrderStatus import handleOrderStatus
from .handler.handleOrderConfirm import handleOrderConfirm


class order:
    def __init__(self, request):
        #self.__auth = authentication()
        if(request.path == "/order/create"):
            self.responseObj = handleCreateOrder(request)
        elif(request.path == "/order/view"):
            self.responseObj = handleOrderView(request)
        elif(request.path == "/order/history"):
            self.responseObj = handleOrderHistory(request)
        elif(request.path == "/order/status"):
            self.responseObj = handleOrderStatus(request)
        elif(request.path == "order/confirm"):
            self.responseObj = handleOrderConfirm(request)
        # elif(request.path == "order/payment"):
        #     self.responseObj = handleOrderPayment(request)
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()

    def getOutput(self):
        abort(404)

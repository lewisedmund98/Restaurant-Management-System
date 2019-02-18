from flask import Request, abort
from frameworks.authentication.auth import authentication
from .handler.handleListOrders import handleListOrders

class orders:
    def __init__(self, request):
        #self.__auth = authentication()
        if(request.path == "/orders/list"):
            self.responseObj = handleListOrders(request)
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()
    
    def getOutput(self):
        abort(404)
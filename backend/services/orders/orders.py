from flask import Request, abort
from frameworks.authentication.auth import authentication
from .handler.handleListOrders import handleListOrders

class orders:
    def __init__(self, request):
        self.__auth = authentication(request.get_json()['key'], request.get_json()['secret'])
        if(request.path == "/orders/list"):
            if(isinstance(self.__auth.authenticateRequest(request.get_json()['access_token'], request.get_json()['id'], 0), dict)):
                self.responseObj = handleListOrders(request)
            else:
                abort(403)
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()
    
    def getOutput(self):
        abort(404)
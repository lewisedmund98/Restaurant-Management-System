from flask import Request, abort
from frameworks.authentication.auth import authentication
from .handler.handleListOrders import handleListOrders

class orders:
    def __init__(self, request):
        self.__auth = authentication(request.get_json()['key'], request.get_json()['secret'])
        if(request.path == "/orders/list"):
            self.__newAccessToken = self.__auth.authenticateRequest(request.get_json()['access_token'], request.get_json()['id'], 0)
            if(isinstance(self.__newAccessToken, dict)):
                self.responseObj = handleListOrders(request)
            else:
                abort(403)
        else:
            self.responseObj = self

    def getResponse(self):
        output = self.responseObj.getOutput()
        if(isinstance(self.__newAccessToken, dict)):
            output.update(self.__newAccessToken)
        return output
    
    def getOutput(self):
        abort(404)
from flask import Request, abort
from frameworks.authentication.auth import authentication
from .handler.handleLogin import handleLogin

class authentication:
    def __init__(self, request):
        if(request.path == "/authentication/login"):
            self.responseObj = handleLogin(request)
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()
    
    def getOutput(self):
        abort(404)
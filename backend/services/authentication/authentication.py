from flask import Request, abort
from frameworks.authentication.auth import authentication

class authentication:

    def __init__(self, request):
        if(request.path == "/login"):
            self.responseObj = handleLogin()
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()
    
    def getOutput(self):
        abort(404)
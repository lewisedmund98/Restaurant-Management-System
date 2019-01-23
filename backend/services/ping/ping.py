from flask import Request, abort
from .handler.handlePing import handlePing

class ping:

    def __init__(self, request):
        if(request.path == "/ping"):
            self.responseObj = handlePing()
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()
    
    def getOutput(self):
        abort(404)
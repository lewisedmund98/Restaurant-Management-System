from flask import Request, abort
from .handler.handleDb import handleDb

class database:

    def __init__(self, request):
        if(request.path == "/database"):
            self.responseObj = handleDb()
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()
    
    def getOutput(self):
        abort(404)
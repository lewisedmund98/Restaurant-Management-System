from flask import Request, abort
from .handler.handleMenu import handleMenu

class menu:

    def __init__(self, request):
        if(request.path == "/menu"):
            self.responseObj = handleMenu()
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()

    def getOutput(self):
        abort(404)

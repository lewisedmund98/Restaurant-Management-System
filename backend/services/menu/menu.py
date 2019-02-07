from flask import Request, abort
from .handler.handleMenu import handleMenu
from .handler.handleItem import handleItem

class menu:

    def __init__(self, request):
        if(request.path == "/menu/items"):
            self.responseObj = handleMenu()
        elif(request.path == "/menu/item"):
            self.responseObj = handleItem(request)
        else:
            self.responseObj = self

    def getResponse(self):
        return self.responseObj.getOutput()

    def getOutput(self):
        abort(404)

from flask import Request, abort
from .handler.handleMenu import handleMenu
from .handler.handleMenuEnabled import handleMenuEnabled
from .handler.handleMenuDisabled import handleMenuDisabled
from .handler.handleItem import handleItem
from. handler.handleMenuItemsToggle import handleMenuItemsToggle
from frameworks.authentication.auth import authentication

class menu:

    def __init__(self, request):
        self.__auth = authentication(request.get_json()['key'], request.get_json()['secret'])
        self.__newAccessToken = None

        if(request.path == "/menu/items"):
            self.responseObj = handleMenu()
        elif(request.path == "/menu/item"):
            self.responseObj = handleItem(request)
        elif(request.path == "/menu/items/enabled"):
            self.responseObj = handleMenuEnabled()
        elif(request.path == "/menu/items/disabled"):
            self.responseObj = handleMenuDisabled()
        elif(request.path == "/menu/items/update"):
            self.responseObj = handleMenuItemsToggle(request)
        else:
            self.responseObj = self

    def getResponse(self):
        output = self.responseObj.getOutput()
        if(isinstance(self.__newAccessToken, dict)):
            output.update(self.__newAccessToken)
        return output

    def getOutput(self):
        abort(404)

    def __checkPermish(self, level):
        self.__newAccessToken = self.__auth.authenticateRequest(self.__request.get_json()['access_token'], self.__request.get_json()['id'], level)
        if(isinstance(self.__newAccessToken, dict)):
            return True
        else:
            abort(403)

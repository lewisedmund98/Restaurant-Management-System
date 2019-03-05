from flask import Request, abort
import fnmatch
from frameworks.authentication.auth import authentication
from .handler.handleListOrders import handleListOrders

class orders:
    def __init__(self, request):
        self.__request = request
        self.__auth = authentication(request.get_json()['key'], request.get_json()['secret'])
        self.__newAccessToken = None
        # These can't be abstracted as permission levels are granular
        if request.path == '/orders/list/completed':
            if self.__checkPermish(0):
                self.responseObj = handleListOrders("completed")
        elif request.path == '/orders/list/waiterUnconfirmed':
            if self.__checkPermish(0):
                self.responseObj = handleListOrders("waiterUnconfirmed")
        elif request.path == '/orders/list/waiterConfirmed':
            if self.__checkPermish(0):
                self.responseObj = handleListOrders("waiterConfirmed")
        elif request.path == '/orders/list/kitchenConfirmed':
            if self.__checkPermish(0):
                self.responseObj = handleListOrders("kitchenConfirmed")
        elif request.path == '/orders/list/kitchenComplete':
            if self.__checkPermish(0):
                self.responseObj = handleListOrders("kitchenComplete")
        elif request.path == '/orders/list/waiterComplete':
            if self.__checkPermish(0):
                self.responseObj = handleListOrders("waiterComplete")
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

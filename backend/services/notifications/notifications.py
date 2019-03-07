from flask import Request, abort
from frameworks.authentication.auth import authentication
from .handler.handleCallWaiter import handleCallWaiter

class notifications:

    def __init__(self, request):
        self.__request = request
        self.__auth = authentication(request.get_json()['key'], request.get_json()['secret'])
        self.__newAccessToken = None

        if(request.path == "/notifications/callWaiter"):
            # Doesn't require staff privilages
            self.responseObj = handleCallWaiter(request.get_json())
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
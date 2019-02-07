import pymysql
from frameworks.authentication.auth import authentication

class handleLogin:
    def __init__(self, request):
        self.__auth = authentication()
        self.__data = request.get_json()

    def getOutput(self):
        return {"login": self.__login()}

    def __login(self):
        uid = self.__auth.authenticateUser(self.__data['access_token'], self.__data['token_secret'], self.__data['username'], self.__data['password'])
        if(uid == False):
            return False
        at = self.__auth.generateAccessToken(self.__data['access_token'], self.__data['token_secret'], uid)
        return {"access_token": at['access_token'], "userID": uid}
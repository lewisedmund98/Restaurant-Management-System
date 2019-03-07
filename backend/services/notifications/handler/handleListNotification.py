from flask import Request, abort
from frameworks.notifications.notifications import notifications

class handleListNotification:

    def __init__(self, request):
        self.__notifications = notifications()
        self.__data = request

    def getOutput(self):
        return {"results": self.__notifications.getNotification(self.__data['id'])}
    
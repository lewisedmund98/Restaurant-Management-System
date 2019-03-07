from flask import Request, abort
from frameworks.notifications.notifications import notifications

class handleCallWaiter:

    def __init__(self, request):
        self.__notifications = notifications()
        self.__data = request

    def getOutput(self):
        return {"notification": self.__notifications.createNotification(self.__data['table'], "call", {})}
    
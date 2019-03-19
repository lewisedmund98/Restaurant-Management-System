import pymysql, json
from frameworks.items.items import items

class handleMenuItemsToggle:
    def __init__(self, request):
        self.__items = items()
        self.__request = request.get_json()

    def getOutput(self):
        return {"result": self.__items.setItemsToggle(self.__request)}
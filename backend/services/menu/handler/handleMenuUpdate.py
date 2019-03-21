import pymysql, json
from frameworks.items.items import items

class handleMenuUpdate:
    def __init__(self, request):
        self.__request = request.get_json()
        self.__items = items()

    def getOutput(self):
        return {"result": self.__items.updateItem(self.__request['itemID'], self.__request['fields'])}


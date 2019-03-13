import pymysql
from frameworks.item.item import item

class handleItem:
    def __init__(self, request):
        self.__data = request
        self.__item = item()

    def getOutput(self):
        return {"result": self.getItem()}

    def getItem(self):
        self.__item.load(self.__data.get_json()['id'])
        return self.__item.get()

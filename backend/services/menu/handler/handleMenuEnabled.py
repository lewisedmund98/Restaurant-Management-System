import pymysql, json
from frameworks.items.items import items

class handleMenuEnabled:
    def __init__(self):
        self.__items = items()

    def getOutput(self):
        return {"result": self.printMenu()}

    def printMenu(self):
        self.__items.loadEnabled()
        return self.__items.get()

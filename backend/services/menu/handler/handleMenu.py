import pymysql, json
from frameworks.items.items import items

class handleMenu:
    def __init__(self):
        self.__items = items()

    def getOutput(self):
        return {"result": self.printMenu()}


    def printMenu(self):
        self.__items.load()
        return self.__items.get()

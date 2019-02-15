import pymysql, json
from frameworks.database.db import db
from frameworks.items.items import items

class handleMenu:
    def __init__(self):
        instance = db()
        self.__db = instance.getInstance()
        self.__items = items()

    def getOutput(self):
        return {"result": self.getMenu()}

    def getMenu(self):
        ids = self.__items.load()
        self.list = []
        for s in ids:
            self.list.append(item().load(s).get())
        return

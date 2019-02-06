import pymysql
from frameworks.database.db import db
from frameworks.item.item import item

class handleItem:
    def __init__(self, request):
        instance = db()
        self.__db = instance.getInstance()
        self.__data = request
        self.__item = item() 

    def getOutput(self):
        return {"result": self.getItem()}

    def getItem(self):
        print(self.__data['id'])
        item.load(self.__data['id'])
        return item.data 

    def printMenu(self):
        if(self.__data['id']):
            cursor = self.__db.cursor()
            cursor.execute("SELECT * FROM teamproject.menuItems WHERE teamproject.menuItems.itemID = %s;", (self.__data['id']))
            return cursor.fetchall()

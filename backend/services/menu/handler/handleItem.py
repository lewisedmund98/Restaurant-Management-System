import pymysql
from frameworks.database.db import db

class handleItem:
    def __init__(self, request):
        instance = db()
        self.__db = instance.getInstance()
        self.__data = request

    def getOutput(self):
        return {"result": self.printMenu()}


    def printMenu(self):
        if(self.__data['id']):
            cursor = self.__db.cursor()
            cursor.execute("SELECT * FROM teamproject.menuItems WHERE teamproject.menuItems.ItemID = %s;", (self.__data['id']))
            return cursor.fetchall()

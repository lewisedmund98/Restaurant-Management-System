import pymysql
from frameworks.database.db import db

class handleMenu:
    def __init__(self):
        instance = db()
        self.__db = instance.getInstance()

    def getOutput(self):
        return {"database": self.printMenu()}


    def printMenu(self):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM teamproject.menuItems Left Join teamproject.Allergies on \
        teamproject.menuItems.itemAllergyID = teamproject.Allergies.AllergyID;")
        return cursor.fetchall()

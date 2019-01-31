import pymysql
from frameworks.database.db import db

class handleMenu:
    def __init__(self):
        instance = db()
        self.__db = instance.getInstance()

    def getOutput(self):
        return {"result": self.printMenu()}


    def printMenu(self):
        cursor = self.__db.cursor()
        cursor.execute("SELECT teamproject.menuItems.*, JSON_OBJECTAGG(teamproject.Allergies.AllergyName, teamproject.Allergies.AllergyInformation) "
        "AS allergies FROM teamproject.menuItems LEFT JOIN teamproject.itemAllergies ON teamproject.menuItems.ItemID = teamproject.itemAllergies.ItemID "
        "LEFT JOIN teamproject.Allergies ON teamproject.itemAllergies.AllergyID = teamproject.Allergies.AllergyID GROUP BY teamproject.menuItems.ItemID;")
        return cursor.fetchall()

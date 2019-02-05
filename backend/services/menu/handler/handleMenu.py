import pymysql, json
from frameworks.database.db import db

class handleMenu:
    def __init__(self):
        instance = db()
        self.__db = instance.getInstance()

    def getOutput(self):
        return {"result": self.printMenu()}


    def printMenu(self):
        cursor = self.__db.cursor()
        cursor.execute("SELECT teamproject.menuItems.*, JSON_OBJECTAGG(teamproject.allergies.allergyName, teamproject.allergies.allergyInformation) "
        "AS allergies FROM teamproject.menuItems LEFT JOIN teamproject.itemAllergies ON teamproject.menuItems.itemID = teamproject.itemAllergies.itemID "
        "LEFT JOIN teamproject.allergies ON teamproject.itemAllergies.allergyID = teamproject.allergies.allergyID GROUP BY teamproject.menuItems.itemID;")

        data = cursor.fetchall()

        # MySQL returns a JSON object we have to iterate through and parse into a dictionary
        for row in data:
            row['allergies'] = json.loads(row['allergies'])
        
        return data

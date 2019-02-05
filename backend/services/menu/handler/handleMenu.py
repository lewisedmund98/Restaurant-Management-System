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
        cursor.execute("SELECT teamproject.menuItems.*, JSON_OBJECTAGG(teamproject.allergies.AllergyName, teamproject.allergies.AllergyInformation) "
        "AS allergies FROM teamproject.menuItems LEFT JOIN teamproject.itemAllergies ON teamproject.menuItems.ItemID = teamproject.itemAllergies.ItemID "
        "LEFT JOIN teamproject.allergies ON teamproject.itemAllergies.AllergyID = teamproject.allergies.AllergyID GROUP BY teamproject.menuItems.ItemID;")

        data = cursor.fetchall()

        # MySQL returns a JSON object we have to iterate through and parse into a dictionary
        for row in data:
            row['allergies'] = json.loads(row['allergies'])
        
        return data

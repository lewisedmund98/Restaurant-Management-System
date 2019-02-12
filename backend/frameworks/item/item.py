from frameworks.database.db import db
import json

class item():

    def __init__(self):
        instance = db()
        self.__db = instance.getInstance()

    def load(self, id):
        cursor = self.__db.cursor()
        cursor.execute("SELECT teamproject.menuItems.*, JSON_OBJECTAGG(teamproject.allergies.allergyName, teamproject.allergies.allergyInformation) "
        "AS allergies FROM teamproject.menuItems LEFT JOIN teamproject.itemAllergies ON teamproject.menuItems.itemID = teamproject.itemAllergies.itemID "
        "LEFT JOIN teamproject.allergies ON teamproject.itemAllergies.allergyID = teamproject.allergies.allergyID WHERE teamproject.menuItems.itemID = %s GROUP BY teamproject.menuItems.itemID;", (id))
        self.data = cursor.fetchone()
        self.data['allergies'] = json.loads(self.data['allergies'])
        return 

    def get(self):
        return self.data

    def save(self):
        return
        #todo

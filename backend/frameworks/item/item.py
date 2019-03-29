from frameworks.database.db import db
import json

class item():
    """
    Object representation of an Item with various helper methods. 
    """
    def __init__(self):
        self.__database = db()
        self.__db = self.__database.getInstance()

    def load(self, id):
        """
        Given an ID, loads the relevant data from the database into the object.

        :param id: valid item ID
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT teamproject.menuItems.*, JSON_OBJECTAGG(teamproject.allergies.allergyName, teamproject.allergies.allergyInformation) "
        "AS allergies FROM teamproject.menuItems LEFT JOIN teamproject.itemAllergies ON teamproject.menuItems.itemID = teamproject.itemAllergies.itemID "
        "LEFT JOIN teamproject.allergies ON teamproject.itemAllergies.allergyID = teamproject.allergies.allergyID WHERE teamproject.menuItems.itemID = %s GROUP BY teamproject.menuItems.itemID;", (id))
        self.data = cursor.fetchone()
        self.data['allergies'] = json.loads(self.data['allergies'])
        return

    def get(self):
        """
        Getter for loaded data. 

        :return: `dict` with item data or null if it hasn't been loaded.load
        """
        return self.data

    def save(self):
        """
        NOP. Hasn't been implemented yet.
        """
        return
        #todo

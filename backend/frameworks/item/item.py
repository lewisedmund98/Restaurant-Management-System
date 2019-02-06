from frameworks.database.db import db


class item(): 
    
    def __init__(self): 
        instance = db()
        self.__db = instance.getInstance() 
        
    def load(self, id):
        cursor = self.__db.cursor()
        cursor.execute("SELECT teamproject.menuItems.*, JSON_OBJECTAGG(teamproject.allergies.allergyName, teamproject.allergies.allergyInformation) "
        "AS allergies FROM teamproject.menuItems WHERE teamproject.menuItems.itemID = %s LEFT JOIN teamproject.itemAllergies ON teamproject.menuItems.itemID = teamproject.itemAllergies.itemID "
        "LEFT JOIN teamproject.allergies ON teamproject.itemAllergies.allergyID = teamproject.allergies.allergyID GROUP BY teamproject.menuItems.itemID;", (id))
        self.data = cursor.fetchone() 
        return 
            
    def save(self):
        return
        #todo

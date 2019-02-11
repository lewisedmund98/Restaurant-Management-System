from frameworks.database.db import db
from frameworks.idGenerator.id import id


class order():

    def __init__(self, name, email, phone, tableNumber, menuItemID,UserID):
        instance = db()
        self.__db = instance.getInstance()
        self.__name = name
        self.__name = email
        self.__name = phone
        self.__name = tableNumber
        self.__name = menuItemID
        self.__UserID = UserID
        self.__id = id()


    def createOrder(self, i):

        cursor = self.__db.cursor()
        cursor.execute(
            "INSERT INTO table_name (column1, column2, column3, ...)"
            "AS allergies FROM teamproject.menuItems LEFT JOIN teamproject.itemAllergies ON teamproject.menuItems.itemID = teamproject.itemAllergies.itemID "
            "LEFT JOIN teamproject.allergies ON teamproject.itemAllergies.allergyID = teamproject.allergies.allergyID WHERE teamproject.menuItems.itemID = %s GROUP BY teamproject.menuItems.itemID;",
            )
        self.data = cursor.fetchone()

    ##def g):
    ##    return self.data

    ##def save(self):
    ##    return
    ##

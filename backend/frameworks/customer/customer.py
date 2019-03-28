from frameworks.database.db import db
from frameworks.idGenerator.id import id
from datetime import datetime, timedelta
import json

class customer:
    
    def __init__(self):
        # Instantiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()
        # Instantiate ID
        self.__id = id()

    def createCustomer(self, name, email):
        cursor = self.__db.cursor()
        cID = self.__id.getID("customer")
        cursor.execute("INSERT INTO `customers` (`customerID`, `name`, `email`) VALUES (%s, %s, %s);",
                       (cID, name, email))
        return cID

    def getCustomer(self, customerID):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `customers` WHERE `customerID` = %s", customerID)
        return cursor.fetchall()
    
    def locateCustomer(self, email):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `customers` WHERE `email` = %s;", email)
        if cursor.rowcount == 1:
            return cursor.fetchone()['customerID']
        elif cursor.rowcount == 0:
            return False
        else:
            raise Exception("Duplicate users")
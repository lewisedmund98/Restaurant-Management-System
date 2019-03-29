from frameworks.database.db import db
from frameworks.idGenerator.id import id
from datetime import datetime, timedelta
import json

class customer:
    """
    Object representation of a customer. 

    Provides various helper methods. Exclusivly used in order class.
    """
    def __init__(self):
        # Instantiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()
        # Instantiate ID
        self.__id = id()

    def createCustomer(self, name, email):
        """
        Allows creation of a new customer. 

        :param name: Customer's name
        :param email: Customer' email
        :returns: Customer's ID
        """
        cursor = self.__db.cursor()
        cID = self.__id.getID("customer")
        cursor.execute("INSERT INTO `customers` (`customerID`, `name`, `email`) VALUES (%s, %s, %s);",
                       (cID, name, email))
        return cID

    def getCustomer(self, customerID):
        """
        Gets customer data. 
    
        :param customerID: Customer's ID
        :returns: `dict` of customer data
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `customers` WHERE `customerID` = %s", customerID)
        return cursor.fetchall()
    
    def locateCustomer(self, email):
        """
        Checks whether a customer already exists for supplied parameters. 

        :param email: Email to check for existing customer's with.
        :returns: Customer ID for existing customer
        :returns: False if no customer found
        :raises: Error on duplicate customers
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `customers` WHERE `email` = %s;", email)
        if cursor.rowcount == 1:
            return cursor.fetchone()['customerID']
        elif cursor.rowcount == 0:
            return False
        else:
            raise Exception("Duplicate users")
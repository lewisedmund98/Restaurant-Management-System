from frameworks.database.db import db
from frameworks.idGenerator.id import id
from datetime import datetime, timedelta


# noinspection PyPep8Naming
class order:

    # noinspection PyUnusedLocal
    def __init__(self):
        instance = db()
        self.__id = id()  # id
        self.__orderinfo = {}  # order information
        self.__orderstatus = {}  # order status

    # noinspection PyMethodMayBeStatic
        
    def getOrderInfo(self):  # getter for private order information field
        return self.__orderinfo

    def getOrderStatus(self):  # getter for private order status field
        return self.__orderstatus

    def loadStatusOfOrder(self, orderID):
        cursor = self.__db.cursor()
        cursor.execute("SELECT `stage` FROM `orderHistory` WHERE `orderID` = %s", orderID)
        if cursor.rowcount == 1:
            self.__orderstatus = cursor.fetchone()
        else:
            raise Exception("Error: OrderID not found.")

    def loadInformationOfOrder(self, orderID):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `orders` WHERE `orderID` = %s", orderID)
        if cursor.rowcount == 1:
            self.__orderinfo = cursor.fetchone()

        else:
            raise Exception("Error: OrderID not found.")

    def createOrder(self, name, phone, email, table, items):
        customerID = self.__locateCustomer(phone, email)
        # Create customer if not exist
        if(customerID == False):
            customerID = self.__createCustomer(name, phone, email)
        # Create order
        orderID = self.__insertOrder(customerID, table)
        # Add items
        for item in items:
            self.__orderAddItem(item)

        return orderID

    def __orderAddItem(self, item):
        cursor = self.__db.cursor()
        iID = self.__id.getID("orderitem")
        cursor.execute("INSERT INTO `orders` (`insertionID`, `orderID`) VALUES (%s, %s);", (iID, item))
        return iID

    def __insertOrder(self, customer, table):
        cursor = self.__db.cursor()
        oID = self.__id.getID("order")
        cursor.execute("INSERT INTO `orders` (`customerID`, `orderID`, `timeCreated`, `table`) VALUES (%s, %s, %s, %s);", (customer, oID, int(datetime.now().timestamp()), table))
        return oID

    def __createCustomer(self, name, phone, email):
        cursor = self.__db.cursor()
        cID = self.__id.getID("order")
        cursor.execute("INSERT INTO `customers` (`customerID`, `name`, `email`, `phone`) VALUES (%s, %s, %s, %s);", (cID, name, email, phone))
        return cID

    def __locateCustomer(self, phone, email):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `customers` WHERE `email` = %s AND `phone` = %s;", (email, phone))

        if(cursor.rowcount == 1):
            return cursor.fetchone()['customerID']
        elif(cursor.rowcount == 0):
            return False
        else:
            raise Exception("Duplicate users")

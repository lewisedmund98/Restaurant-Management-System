from frameworks.database.db import db
from frameworks.idGenerator.id import id
from datetime import datetime, timedelta
import json


# noinspection PyPep8Naming
class order:

    # noinspection PyUnusedLocal
    def __init__(self):
        # Instatiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()
        # Instantiate ID
        self.__id = id()
        # Private Fields  
        self.__orderinfo = None
        self.__orderhistory = None
        
    def getOrderInfo(self):  # getter for private order information field
        return self.__orderinfo

    def getOrderStatus(self):  # getter for private order status field
        return self.__orderhistory[0]
    
    def getOrderHistory(self):  # getter for private order status field
        return self.__orderhistory

    def loadOrderHistory(self, orderID):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `orderHistory` WHERE `orderID` = %s ORDER BY `inserted` DESC", orderID)
        if cursor.rowcount == 1:
            self.__orderhistory = cursor.fetchall()
            return True
        else:
            raise Exception("Error: OrderID not found.")

    def loadOrderInfo(self, orderID):
        cursor = self.__db.cursor()
        cursor.execute("SELECT orders.*, JSON_ARRAYAGG(orderItems.itemID) as items FROM orders LEFT JOIN orderItems ON orderItems.orderID = orders.orderID WHERE orders.orderID = %s GROUP BY orders.orderID;", (orderID))
        if cursor.rowcount == 1:
            self.__orderinfo = cursor.fetchone()
            self.__orderinfo['items'] = json.loads(self.__orderinfo['items'])
            return True
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
            self.__orderAddItem(orderID, item)

        return orderID
    
    def waiterConfirm(self, id):
        return self.__insertOrderHistory(id, "waiterConfirmed", {})
    
    def kitchenConfirm(self, id, eta):
        return self.__insertOrderHistory(id, "kitchenConfirmed", {"eta": eta})

    def __orderAddItem(self, order, item):
        cursor = self.__db.cursor()
        iID = self.__id.getID("orderitem")
        cursor.execute("INSERT INTO `orderItems` (`insertionID`, `orderID`, `itemID`) VALUES (%s, %s, %s);", (iID, order, item))
        return iID

    def __insertOrder(self, customer, table):
        cursor = self.__db.cursor()
        oID = self.__id.getID("order")
        cursor.execute("INSERT INTO `orders` (`customerID`, `orderID`, `timeCreated`, `table`) VALUES (%s, %s, %s, %s);", (customer, oID, int(datetime.now().timestamp()), table))
        # Create order history
        self.__insertOrderHistory(oID, "created", {})
        return oID

    def __insertOrderHistory(self, order, stage, meta):
        cursor = self.__db.cursor()
        iID = self.__id.getID("orderhist")
        cursor.execute("INSERT INTO `orderHistory` (`insertionID`, `orderID`, `stage`, `inserted`, `metafield`) VALUES (%s, %s, %s, %s, %s);", (iID, order, stage, int(datetime.now().timestamp()), json.dumps(meta)))
        return iID

    def __createCustomer(self, name, phone, email):
        cursor = self.__db.cursor()
        cID = self.__id.getID("customer")
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

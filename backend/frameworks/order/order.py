from frameworks.database.db import db
from frameworks.idGenerator.id import id
from frameworks.customer.customer import customer
from datetime import datetime, timedelta
import json

# noinspection PyPep8Naming
class order:

    # noinspection PyUnusedLocal
    def __init__(self):
        # Instantiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()
        # Instantiate ID
        self.__id = id()
        # Instantiate Customer
        self.__customer = customer()
        # Private Fields  
        self.__orderinfo = None
        self.__orderhistory = None

    def getOrderInfo(self):  # getter for private order information field
        return self.__orderinfo

    def getOrderStatus(self):  # getter for private order status field
        return self.__orderhistory[0]

    def getOrderHistory(self):  # getter for private order status field
        return self.__orderhistory

    def getCustomer(self):
        if self.__orderinfo is None:
            return False
        else:
            self.__customer.getCustomer(self.__orderinfo['customerID'])

    def loadOrderHistory(self, orderID):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `orderHistory` WHERE `orderID` = %s ORDER BY `inserted` DESC", orderID)
        if cursor.rowcount != 0:
            self.__orderhistory = cursor.fetchall()
            return True
        else:
            raise Exception("Error: OrderID not found.")

    def loadOrderInfo(self, orderID):
        cursor = self.__db.cursor()
        cursor.execute(
            "SELECT orders.*, JSON_ARRAYAGG(orderItems.itemID) as items FROM orders LEFT JOIN orderItems ON orderItems.orderID = orders.orderID WHERE orders.orderID = %s GROUP BY orders.orderID;",
            orderID)
        if cursor.rowcount == 1:
            self.__orderinfo = cursor.fetchone()
            # Unjsonify the order items
            self.__orderinfo['items'] = json.loads(self.__orderinfo['items'])
            # Grab the customer data
            self.__orderinfo['customer'] = self.__customer.getCustomer(self.__orderinfo['customerID'])
            del self.__orderinfo['customerID']

            return True
        else:
            raise Exception("Error: OrderID not found.")

    def createOrder(self, name, email, table, items):
        customerID = self.__customer.locateCustomer(email)
        # Create customer if not exist
        if not customerID:
            customerID = self.__customer.createCustomer(name, email)
        # Create order
        orderID = self.__insertOrder(customerID, table)
        # Add items
        for item in items:
            self.__orderAddItem(orderID, item)
        return orderID

    def paymentComplete(self, id, chargeID):
        return self.__insertOrderHistory(id, "paid", {"stripeChargeID": chargeID})

    def waiterConfirm(self, id):
        return self.__insertOrderHistory(id, "waiterConfirmed", {})

    def orderCancel(self, id, refund=""):
        return self.__insertOrderHistory(id, "cancelled", {"stripeRefundID": refund})

    def kitchenConfirm(self, id, eta=0):
        if(eta == 0):
            json = None
        else: 
            json = {"eta": eta}
        return self.__insertOrderHistory(id, "kitchenConfirmed", json)

    def kitchenComplete(self, id):
        return self.__insertOrderHistory(id, "kitchenComplete", {})

    def waiterComplete(self, id):
        return self.__insertOrderHistory(id, "waiterComplete", {})

    def __orderAddItem(self, order, item):
        cursor = self.__db.cursor()
        iID = self.__id.getID("orderitem")
        cursor.execute("INSERT INTO `orderItems` (`insertionID`, `orderID`, `itemID`) VALUES (%s, %s, %s);",
                       (iID, order, item))
        return iID

    def __insertOrder(self, customer, table):
        cursor = self.__db.cursor()
        oID = self.__id.getID("order")
        cursor.execute(
            "INSERT INTO `orders` (`customerID`, `orderID`, `timeCreated`, `table`) VALUES (%s, %s, %s, %s);",
            (customer, oID, int(datetime.now().timestamp()), table))
        # Create order history
        self.__insertOrderHistory(oID, "created", {})
        return oID

    def __insertOrderHistory(self, order, stage, meta):
        cursor = self.__db.cursor()
        iID = self.__id.getID("orderhist")
        cursor.execute(
            "INSERT INTO `orderHistory` (`insertionID`, `orderID`, `stage`, `inserted`, `metafield`) VALUES (%s, %s, %s, %s, %s);",
            (iID, order, stage, int(datetime.now().timestamp()), json.dumps(meta)))
        return iID
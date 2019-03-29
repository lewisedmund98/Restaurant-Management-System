from frameworks.database.db import db
from frameworks.idGenerator.id import id
from frameworks.customer.customer import customer
from datetime import datetime, timedelta
import json

# noinspection PyPep8Naming
class order:
    """
    Order class to handle the representation of an order. Includes various helper methods. 
    """
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

    def getOrderInfo(self): 
        """
        Getter for private order information field. 

        :returns: Loaded order information
        """
        return self.__orderinfo

    def getOrderStatus(self):
        """
        Getter for private order status field

        :returns: Loaded order status information
        """
        return self.__orderhistory[0]

    def getOrderHistory(self):
        """
        Getter for private order history field

        :returns: Loaded order history information
        """
        return self.__orderhistory

    def getCustomer(self):
        """
        Getter for customer associated with loaded order

        :returns: Loaded order status information
        """
        if self.__orderinfo is None:
            return False
        else:
            self.__customer.getCustomer(self.__orderinfo['customerID'])

    def loadOrderHistory(self, orderID):
        """
        Loads order history into class.

        :param orderID: order ID to load history for 
        :returns: True on success
        :raises: order not found exception
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `orderHistory` WHERE `orderID` = %s ORDER BY `inserted` DESC", orderID)
        if cursor.rowcount != 0:
            self.__orderhistory = cursor.fetchall()
            return True
        else:
            raise Exception("Error: OrderID not found.")

    def loadOrderInfo(self, orderID):
        """
        Loads order information into class.

        :param orderID: order ID to load order information for 
        :returns: true on success
        :raises: exception on order ID not found
        """
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
        """
        Create an order for a customer. 

        :param name: customer's name
        :param email: customer's email
        :param table: customer's table
        :param items: dict of items the customer has selected
        :returns: order ID on success
        """
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
        """
        Marks a payment as complete. 

        :param id: order ID to mark as paid
        :param chargeID: the associated Stripe Charge ID
        """
        return self.__insertOrderHistory(id, "paid", {"stripeChargeID": chargeID})

    def waiterConfirm(self, id):
        """
        Marks an item as confirmed by the waiter

        :param id: order ID to mark 
        """
        return self.__insertOrderHistory(id, "waiterConfirmed", {})

    def orderCancel(self, id, refund=""):
        """
        Marks an item as cancelled. 

        :param id: order ID to mark as canclled
        :param refund: Stripe refund ID, if the order was in a stage that required issuing a refund
        """
        return self.__insertOrderHistory(id, "cancelled", {"stripeRefundID": refund})

    def kitchenConfirm(self, id, eta=0):
        """
        Marks an item as confirmed by the kitchen

        :param id: order ID to mark as confirmed
        :param eta: optional parameter for the expected time taken to complete the order
        """
        if(eta == 0):
            json = None
        else: 
            json = {"eta": eta}
        return self.__insertOrderHistory(id, "kitchenConfirmed", json)

    def kitchenComplete(self, id):
        """
        Marks an item as completed by the kitchen

        :param id: order ID to mark 
        """
        return self.__insertOrderHistory(id, "kitchenComplete", {})

    def waiterComplete(self, id):
        """
        Marks an item as completed by the waiter

        :param id: order ID to mark 
        """
        return self.__insertOrderHistory(id, "waiterComplete", {})

    def __orderAddItem(self, order, item):
        """
        Helper class to add an item to an order. 

        :param item: item to add to the order
        :param id: order ID to have the item added to 
        :returns: insertion ID
        """
        cursor = self.__db.cursor()
        iID = self.__id.getID("orderitem")
        cursor.execute("INSERT INTO `orderItems` (`insertionID`, `orderID`, `itemID`) VALUES (%s, %s, %s);",
                       (iID, order, item))
        return iID

    def __insertOrder(self, customer, table):
        """
        Creates an order. 

        :param customer: customer ID the order is for
        :param table: table the customer is at
        :returns: order ID
        """
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
from frameworks.database.db import db
from .order import order
from collections import OrderedDict


# This does not extend orders as none of the methods are shared
# This class returns an array of order objects
class orders():
    def __init__(self):
        # Instantiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()
        self.__dict = getAllOrderHistory()

    def loadOrders(self, filter):
        if filter == "waiterUnconfirmed":
            ids = self.__getWaiterUnconfirmed()
        elif filter == "cancelledOrders":
            ids = self.__getCancelledOrders()
        elif filter == "waiterConfirmed":
            ids = self.__getWaiterConfirmed()
        elif filter == "kitchenConfirmed":
            ids = self.__getKitchenConfirmed()
        elif filter == "kitchenComplete":
            ids = self.__getKitchenComplete()
        elif filter == "waiterComplete":
            ids = self.__getWaiterComplete()
        elif filter == "awaitingDelivery":
            pass;
        elif filter == "completedRecent":
            pass;
        elif filter == "completed":
            ids = self.__getAllOrderIDs()
        else:
            raise Exception('Filter condition missing')
        self.__loadItems(ids)
        return True

    def getOrders(self):
        data = []
        for item in self.__objects:
            data.append(item.getOrderInfo())
        return data

    def __loadItems(self, ids):
        self.__objects = []
        for item_id in ids:
            od = order()
            od.loadOrderInfo(item_id['orderID'])
            self.__objects.append(od)
        return

    # Endpoint queries
    def __getAllOrderIDs(self):
        cursor = self.__db.cursor()
        cursor.execute("SELECT orderID FROM `orders`")
        return cursor.fetchall()

    def __getWaiterUnconfirmed(self):


        #self.__finaldict = ()
        #self.__finaldict.update({'': 3})
        #
        #self.__dict = getAllOrderHistory()
        #for key, value in sorted(self.__dict.items(), key=lambda kv: kv[1]['insertion'], reverse=True):
        #    do_something_with(key, value)
        #    if value = "waiterUnconfirmed":



        cursor = self.__db.cursor()
        cursor.execute(
            "SELECT orderID FROM orderHistory WHERE stage = 'paid' AND stage != 'cancelled' AND stage != 'kitchenConfirmed' AND stage != 'waiterComplete' AND stage != 'kitchenComplete' GROUP BY orderID;")
        return cursor.fetchall()

    def __getWaiterConfirmed(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "SELECT orderID FROM orderHistory WHERE stage = 'waiterConfirmed' AND stage != 'cancelled' AND stage != 'kitchenConfirmed' AND stage != 'waiterComplete' AND stage != 'kitchenComplete' GROUP BY orderID;")
        return cursor.fetchall()

    def __getCancelledOrders(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "SELECT orderID from orderHistory WHERE orderID NOT IN (SELECT orderID from orderHistory WHERE stage != 'cancelled');")
        return cursor.fetchall()

    def __getKitchenConfirmed(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "SELECT orderID FROM orderHistory WHERE stage = 'kitchenConfirmed' AND stage != 'cancelled' AND stage != 'waiterComplete' AND stage != 'kitchenComplete' GROUP BY orderID;")
        return cursor.fetchall()

    def __getWaiterComplete(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "SELECT orderID FROM orderHistory WHERE stage = 'waiterComplete'AND stage != 'cancelled' GROUP BY orderID;")
        return cursor.fetchall()

    def __getKitchenComplete(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "SELECT orderID FROM orderHistory WHERE stage = 'kitchenComplete' AND stage != 'cancelled' AND stage != 'waiterComplete' GROUP BY orderID;")
        return cursor.fetchall()

    def __getPaid(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "SELECT orderID FROM orderHistory WHERE stage = 'paid' AND stage != 'cancelled' AND stage != 'kitchenConfirmed' AND stage != 'waiterComplete' AND stage != 'kitchenComplete' AND stage != 'waiterConfirmed'' GROUP BY orderID;")
        return cursor.fetchall()

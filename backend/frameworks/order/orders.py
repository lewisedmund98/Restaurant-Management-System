from frameworks.database.db import db
from .order import order

# This does not extend orders as none of the methods are shared
# This class returns an array of order objects
class orders():
    def __init__(self):
        # Instatiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()

    def loadOrders(self, filter):
        if(filter == "waiterUnconfirmed"):
            ids = self.__getWaiterUnconfirmed()
        elif(filter == "kitchenUnconfirmed"):
            pass;
        elif(filter == "kitchenInProgress"):
            pass;
        elif(filter == "awaitingDelivery"):
            pass;
        elif(filter == "completedRecent"):
            pass;
        elif(filter == "completed"):
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
        cursor = self.__db.cursor()
        cursor.execute("SELECT orderID from orderHistory WHERE orderID NOT IN (SELECT orderID from orderHistory WHERE stage != 'created');")
        return cursor.fetchall()

    def __getWaiterConfirmed(self):
        cursor = self.__db.cursor()
        cursor.execute("SELECT orderID from orderHistory WHERE orderID NO")

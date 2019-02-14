from frameworks.database.db import db
from .order import order

# This does not extend orders as none of the methods are shared
# This class returns an array of order objects
class orders():
    def __init__(self):
        # Instatiate Database
        instance = db()
        self.__db = instance.getInstance()
    
    def loadOrders(self):
        ids = self.__getOrderIDs()
        self.__loadItems(ids)
        return True

    def getOrders(self):
        data = []
        for item in self.__objects:
            data.append(item.getOrderInfo())
        return data

    def __getOrderIDs(self):
        cursor = self.__db.cursor()
        cursor.execute("SELECT orderID FROM `orders`")
        return cursor.fetchall()

    def __loadItems(self, ids):
        self.__objects = []
        for item_id in ids:
            od = order()
            od.loadOrderInfo(item_id['orderID'])
            self.__objects.append(od)
        return
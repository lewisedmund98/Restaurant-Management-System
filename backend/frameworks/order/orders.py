from frameworks.database.db import db
from .order import order


# This does not extend orders as none of the methods are shared
# This class returns an array of order objects

class orders:
    def __init__(self):
        # Instantiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()
        self.__mappings = {
            "created": "created", 
            "waiterUnconfirmed": "paid",
            "waiterConfirmed": "waiterConfirmed", 
            "kitchenConfirmed": "kitchenConfirmed", 
            "kitchenComplete": "kitchenComplete", 
            "completed": "waiterComplete",
            "ordersCancelled": "cancelled"
            }

    def loadOrders(self, filter):
        if filter == "completed":
            ids = self.__getAllOrderIDs()
        else:
            ids = self.__loadMappedOrders(filter)
        self.__loadItems(ids)
        return True

    def __loadMappedOrders(self, filter):
        matchedOrders = []

        for order in self.__getAllOrderIDs():
            if(self.__confirmLastStage(order['orderID'], self.__mappings[filter])):
                matchedOrders.append(order)

        return matchedOrders

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
    
    def __confirmLastStage(self, orderID, stage):
        cursor = self.__db.cursor()
        cursor.execute("SELECT `stage` FROM `orderHistory` WHERE `orderID` = %s ORDER BY `inserted` DESC LIMIT 1", (orderID));

        if(cursor.rowcount != 1):
            raise Exception("Order has no history")
        else:
            data = cursor.fetchone()

        if(data['stage'] == stage):
            return True
        else: 
            return False
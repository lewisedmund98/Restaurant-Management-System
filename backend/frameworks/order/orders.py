from frameworks.database.db import db
from .order import order

class orders:
    """
    Class for orders with helper methods. This does not extend orders as none of the methods are shared. 
    """
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
        """
        Loads orders according the filter provided and mappings stored by the class. 

        :param filter: filter (endpoint name)
        :returns: True on success
        :raises: exception if mapping does not exist
        """
        if filter == "completed":
            ids = self.__getAllOrderIDs()
        else:
            ids = self.__loadMappedOrders(filter)
        self.__loadItems(ids)
        return True

    def __loadMappedOrders(self, filter):
        """
        Helper method to load orders specified by the filter. 

        :param filter: filter (endpoint name)
        """
        matchedOrders = []

        for order in self.__getAllOrderIDs():
            if(self.__confirmLastStage(order['orderID'], self.__mappings[filter])):
                matchedOrders.append(order)

        return matchedOrders

    def getOrders(self):
        """
        Getter for loaded orders

        :returns: dict of loaded orders
        """
        data = []
        for item in self.__objects:
            data.append(item.getOrderInfo())
        return data

    def __loadItems(self, ids):
        """ 
        Loads items for an order. 
        
        :param ids: item IDs to load
        """
        self.__objects = []
        for item_id in ids:
            od = order()
            od.loadOrderInfo(item_id['orderID'])
            self.__objects.append(od)
        return

    def __getAllOrderIDs(self):
        """
        Gets all order IDs. 

        :returns: order IDs fetched
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT orderID FROM `orders`")
        return cursor.fetchall()
    
    def __confirmLastStage(self, orderID, stage):
        """
        Checks whether the last stage matches the one supplied.

        :param orderID: order ID to check the stage for
        :param stage: stage to check against
        :returns: True if it matches
        :returns: Flase if it doesn't 
        :raises: Exception if order has no history
        """
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
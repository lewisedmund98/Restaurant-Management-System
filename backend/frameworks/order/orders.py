from frameworks.database.db import db
from .order import order
# This does not extend orders as none of the methods are shared
# This class returns an array of order objects

class orders():
    def __init__(self):
        # Instantiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()
        
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

    def __getCancelledOrders(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "SELECT orderID from orderHistory WHERE orderID NOT IN (SELECT orderID from orderHistory WHERE stage != 'cancelled');")
        return cursor.fetchall()

    def __getWaiterUnconfirmed(self): #get Paid
        cursor = self.__db.cursor()
        cursor.execute(
            "CREATE TABLE T AS SELECT * FROM ( SELECT orderID, count(*) as 'rownumber' FROM orderHistory GROUP BY orderID) AS B JOIN ( SELECT orderID AS 'ignore', stage AS 'state' FROM orderHistory) AS A ON A.ignore=B.orderID; SELECT orderID FROM T WHERE state = 'paid' AND rownumber = 2; DROP TABLE T;")
        return cursor.fetchall()

    def __getWaiterConfirmed(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "CREATE TABLE T AS SELECT * FROM ( SELECT orderID, count(*) as 'rownumber' FROM orderHistory GROUP BY orderID) AS B JOIN ( SELECT orderID AS 'ignore', stage AS 'state' FROM orderHistory) AS A ON A.ignore=B.orderID; SELECT orderID FROM T WHERE state = 'waiterConfirmed' AND rownumber = 3; DROP TABLE T;")
        return cursor.fetchall()

    def __getKitchenConfirmed(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "CREATE TABLE T AS SELECT * FROM ( SELECT orderID, count(*) as 'rownumber' FROM orderHistory GROUP BY orderID) AS B JOIN ( SELECT orderID AS 'ignore', stage AS 'state' FROM orderHistory) AS A ON A.ignore=B.orderID; SELECT orderID FROM T WHERE state = 'kitchenConfirmed' AND rownumber = 4; DROP TABLE T;")
        return cursor.fetchall()

    def __getKitchenComplete(self):
        cursor = self.__db.cursor()
        cursor.execute(
            "CREATE TABLE T AS SELECT * FROM ( SELECT orderID, count(*) as 'rownumber' FROM orderHistory GROUP BY orderID) AS B JOIN ( SELECT orderID AS 'ignore', stage AS 'state' FROM orderHistory) AS A ON A.ignore=B.orderID; SELECT orderID FROM T WHERE state = 'kitchenComplete' AND rownumber = 5; DROP TABLE T;")
        return cursor.fetchall()

    def __getWaiterComplete(self): # get Order complete
        cursor = self.__db.cursor()
        cursor.execute(
            "CREATE TABLE T AS SELECT * FROM ( SELECT orderID, count(*) as 'rownumber' FROM orderHistory GROUP BY orderID) AS B JOIN ( SELECT orderID AS 'ignore', stage AS 'state' FROM orderHistory) AS A ON A.ignore=B.orderID; SELECT orderID FROM T WHERE state = 'waiterComplete' AND rownumber = 6; DROP TABLE T;")
        return cursor.fetchall()

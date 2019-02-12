from frameworks.database.db import db
from frameworks.idGenerator.id import id


# noinspection PyPep8Naming
class order:

    # noinspection PyUnusedLocal
    def __init__(self):
        instance = db()
        self.__id = id()  # id
        self.__orderinfo = ""  # order information
        self.__orderstatus = ""  # order status

    # noinspection PyMethodMayBeStatic
    def returnID(self):
        return id.getID("order")

    def getOrderInfo(self):  # getter for private order information field
        return self.__orderinfo

    def getOrderStatus(self):  # getter for private order status field
        return self.__orderstatus

    def loadStatusOfOrder(self, orderID):
        cursor = self.__db.cursor()
        cursor.execute("SELECT `stage` FROM `orderHistory` WHERE `orderID` = %s", orderID)
        if cursor.rowcount == 1:
            self.__orderstatus = cursor.fetchone()
            print("status of order" + orderID + "loaded into private order status field.")
        else:
            raise Exception("Error: OrderID not found.")

    def loadInformationOfOrder(self, orderID):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `orders` WHERE `orderID` = %s", orderID)
        if cursor.rowcount == 1:
            self.__orderinfo = cursor.fetchone()
            print("status of order" + orderID + "loaded into private order information field.")
        else:
            raise Exception("Error: OrderID not found.")

    # sql stuff to add order to database, use ID generator to make an order ID

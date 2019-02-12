from frameworks.database.db import db
from frameworks.idGenerator.id import id


# noinspection PyPep8Naming
class order:

    # noinspection PyUnusedLocal
    def __init__(self):
        instance = db()
        self.__id = id()  # id
        self.__data = ""  # order information
        self.__status = ""  # order status

    # noinspection PyMethodMayBeStatic
    def returnID(self):
        return id.getID("order")

        # sql stuff to add order to database, use ID generator to make an order ID

    def loadOrderInformation(self, data):
        self.__data = data

    def getData(self):  # getter for private data (order information) field
        return self.__data

    def getStatus(self):  # getter for private status field
        return self.__status

    def loadStatusOfOrder(self, orderID):
        cursor = self.__db.cursor()
        cursor.execute("SELECT `stage` FROM `orderHistory` WHERE `orderID` = %s", orderID)
        if cursor.rowcount == 1:
            self.__status = cursor.fetchone()
            print("status of order"+orderID+"loaded into private status field.")
        else:
            raise Exception("Error: OrderID not found.")

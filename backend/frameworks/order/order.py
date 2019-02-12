from frameworks.database.db import db
from frameworks.idGenerator.id import id


class order():

    def __init__(self):
        instance = db()
        self.__id = id() # id
        self.__data = "" # order information
        self.__status = "" # order status


    def returnID():
        return id.getID("order")



        # sql stuff to add order to database, use ID generator to make an order ID



    def loadOrderInformation(data):
        data = data




    def getData(self):
        return self.__data
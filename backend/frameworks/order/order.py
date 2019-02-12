from frameworks.database.db import db
from frameworks.idGenerator.id import id


class order():

    def __init__(self):
        instance = db()
        self.__id = id()

    @staticmethod
    def returnID():
        return id.getID("order")

    def createOrder(self):
        return self

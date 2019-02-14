from flask import Request, abort
from frameworks.order.order import order
from frameworks.database.db import db
from frameworks.idGenerator.id import id

class staffOrder(order):
    def __init__(self, orderID):
        super(staffOrder, self).__init__()
        instance = db()
        self.__db = instance.getInstance()
        self.__id = orderID

    def waiterConfirm(self):
        order = self.__id
        stage = "waiterConfirmed"
        meta = {}
        iID = self.__insertOrderHistory(order, stage, meta)
        return iID

    def kitchenCorfirm(self, ETA):
        meta = {'deliverTime' : ETA}
        order = self.__id
        stage = "kitchenCorfirm"
        iID = self.__insertOrderHistory(order, stage, meta)
        return iID

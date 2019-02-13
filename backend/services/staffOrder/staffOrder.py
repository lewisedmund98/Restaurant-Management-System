from flask import Request, abort
from frameworks.order.order import order
from frameworks.database.db import db
from frameworks.idGenerator.id import id

class staffOrder(order.order):
     def __init__(self):
         instance = db()
         self.__db = instance.getInstance()
         self.__id = id()



    def waiterConfirm(self):
        '''
        initialize the __insertOrderHistory
        it should return the insertionID that
        the insert method returns
        '''
        order = self.id.getID()
        stage = "waiterConfirmed"
        meta = {}
        iID = __insertOrderHistory(order, stage, meta)
        return iID


    def kitchenCorfirm(self, ETA):
        meta = {'deliverTime' : ETA}
        order = self.id.getID()
        stage = "kitchenCorfirm"

        iID =__insertOrderHistory(order, stage, meta)
        return iID

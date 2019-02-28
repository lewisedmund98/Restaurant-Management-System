from flask import Request, abort
from frameworks.order.order import order

class handleCreateOrder:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"orderID": self.__createOrder()}

    def __createOrder(self):
        if self.__data['items'] == []
            raise Exception ('No items have been selected')
        else:
            return self.__order.createOrder(self.__data['name'], self.__data['phone'], self.__data['email'], self.__data['table'], self.__data['items'])

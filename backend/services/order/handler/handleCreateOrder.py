from flask import Request, abort
from frameworks.order.order import order

class handleCreateOrder:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"orderID": self.__createOrder()}

    def __createOrder(self):
<<<<<<< HEAD
        if self.__data['items'] == {}:
=======
        if self.__data['items'] == []
>>>>>>> e7df706809c3a1638139c053cb980d476c0863b3
            raise Exception ('No items have been selected')
        else:
            return self.__order.createOrder(self.__data['name'], self.__data['phone'], self.__data['email'], self.__data['table'], self.__data['items'])

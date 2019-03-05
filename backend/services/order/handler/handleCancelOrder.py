from frameworks.order.order import order


class handleCancelOrder:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"confirmed": self.__cancelOrder()}

    def __cancelOrder(self):
        return self.__order.cancelOrder(self.__data['id'])

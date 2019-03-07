from frameworks.order.order import order


class handleCancelOrder:
    def __init__(self, request):
        self.__order = order()
        self.__data = request.get_json()

    def getOutput(self):
        return {"cancelled": self.__cancelOrder()}

    def __cancelOrder(self):
        return self.__order.orderCancel(self.__data['id'])

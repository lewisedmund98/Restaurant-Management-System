from frameworks.order.order import order
from frameworks.payment.payment import payment


class handleCancelOrder:
    def __init__(self, request):
        self.__order = order()
        self.__payment = payment()
        self.__data = request.get_json()

    def getOutput(self):
        return {"cancelled": self.__cancelOrder()}

    def __cancelOrder(self):
        refund = self.__payment.cancelCharge(self.__data['order_id'])
        return self.__order.orderCancel(self.__data['order_id'], refund)

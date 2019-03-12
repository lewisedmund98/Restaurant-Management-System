from frameworks.database.db import db
from frameworks.order.order import order
from frameworks.item.item import item
import stripe

class payment:

    def __init__(self):
        stripe.api_key = "sk_test_keZYXG2kFfc2GeQOEDA6gSyI"
        self.__order = order()
        self.__itemClass = item()
    
    def submitAuthorisation(self, orderID, tokenID):
        # Get order info
        self.__order.loadOrderInfo(orderID)
        orderInfo = self.__order.getOrderInfo()
        # Check order is in the right stage
        if(self.__order.getOrderStatus()['stage'] != "created"):
            raise Exception("Order not in correct stage for payment")
        
        total = self.__calculatePrice(orderInfo)

        charge = stripe.Charge.create(
            amount=total,
            currency='gbp',
            description=orderID,
            source=tokenID,
            capture=False, # Don't submit for presentment
        )

        # Card was declined
        if(charge['failure_message'] != None): 
            return {'failed': charge['failure_message']}

        insertionID = self.__order.paymentComplete(orderID, charge['id'])
        
        return {'complete': insertionID}


    def submitPresentmnet(self, orderID):
        # Get order information from orderID including chargeID
        charge = stripe.Charge.retrieve('ch_mfTMHyfuKezENkHGwYhs')
        charge.capture()

    def __calculatePrice(self, orderInfo):
        total = float(0.00)
        for item in orderInfo['items']:
            self.__itemClass.load(item)
            itemRecord = self.__itemClass.get()
            total = total + float(itemRecord['price'])
        
        return total
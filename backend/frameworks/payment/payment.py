from frameworks.database.db import db
from frameworks.order.order import order
from frameworks.item.item import item
import stripe, json

class payment:

    def __init__(self):
        stripe.api_key = "sk_test_keZYXG2kFfc2GeQOEDA6gSyI"
        self.__order = order()
        self.__itemClass = item()
    
    def submitAuthorisation(self, orderID, tokenID):
        # Get order info and history 
        self.__order.loadOrderInfo(orderID)
        self.__order.loadOrderHistory(orderID)
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


    def submitPresentment(self, orderID):
        # Get order information from orderID including chargeID
        self.__order.loadOrderHistory(orderID)
        orderInfo = self.__order.getOrderStatus()
        if(orderInfo['stage'] != "paid"):
            raise Exception("Order not in correct stage for presentment")
        
        extractedChargeID = json.loads(orderInfo['metafield'])['stripeChargeID']
        charge = stripe.Charge.retrieve(extractedChargeID)
        response = charge.capture()

        if(response['captured'] == True):
            return True
        else:
            raise Exception("Charge could not be presented")

    def cancelCharge(self, orderID):
        # Get order information from orderID including chargeID
        self.__order.loadOrderHistory(orderID)
        chargeID = None
        for historyRow in self.__order.getOrderHistory():
            if(historyRow['stage'] == "paid"):
                chargeID = json.loads(historyRow['metafield'])['stripeChargeID']

        if(chargeID == None): 
            return False

        re = stripe.Refund.create(
            charge = chargeID
        )

        if(re['status'] != "succeeded"):
            return False
        else:
            return re['id']


    def __calculatePrice(self, orderInfo):
        total = float(0.00)
        for item in orderInfo['items']:
            self.__itemClass.load(item)
            itemRecord = self.__itemClass.get()
            total = total + float(itemRecord['itemPrice'])
        
        return int(total*100)
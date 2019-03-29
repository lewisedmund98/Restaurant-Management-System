from frameworks.database.db import db
from frameworks.order.order import order
from frameworks.item.item import item
import stripe, json

class payment:
    """
    Class to handle payment interactions with Stripe on the backend.
    """
    def __init__(self):
        stripe.api_key = "sk_test_keZYXG2kFfc2GeQOEDA6gSyI"
        self.__order = order()
        self.__itemClass = item()
    
    def submitAuthorisation(self, orderID, tokenID):
        """
        Submits an authorisation to Stripe based on tokenised information from form. 

        :param orderID: order ID for which the payment is being submitted
        :param tokenID: Stripe token from the frontend payment form 
        :returns: Dict with success or failure message
        """
        # Get order info and history 
        self.__order.loadOrderInfo(orderID)
        self.__order.loadOrderHistory(orderID)
        orderInfo = self.__order.getOrderInfo()

        # Check order is in the right stage
        if(self.__order.getOrderStatus()['stage'] != "created"):
            raise Exception("Order not in correct stage for payment")
        
        total = self.__calculatePrice(orderInfo)
        
        # Try to charge card
        try:
            charge = stripe.Charge.create(
                amount=total,
                currency='gbp',
                description=orderID,
                source=tokenID,
                capture=False, # Don't submit for presentment
            )
        except:
            # Card was declined for a weird reason
            return {"failed": ""}

        # Card was declined
        if(charge['failure_message'] != None): 
            return {'failed': charge['failure_message']}

        insertionID = self.__order.paymentComplete(orderID, charge['id'])
        
        return {'complete': insertionID}


    def submitPresentment(self, orderID):
        """
        Submits a presentment for an order with Stripe charge ID
        :param orderID: order ID to submit the presentment for
        :returns: True on success
        :raises: exception for order that is not authorised or has already presented
        :raises: exception when presentment failed
        """
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
        """
        Cancels authorised or presented charges on an order ID.
        
        :param orderID: order ID to cancel charges for
        :returns: True on success
        :returns: False on failure 
        """
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
        """
        Calculates price of an order based on items for the order.
        :param orderInfo: dict of orderInfo for the order to calculate price for
        :returns: the calculated price
        """
        total = float(0.00)
        for item in orderInfo['items']:
            self.__itemClass.load(item)
            itemRecord = self.__itemClass.get()
            total = total + float(itemRecord['itemPrice'])
        
        return int(total*100)
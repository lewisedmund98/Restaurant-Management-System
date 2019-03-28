"""
The backend Flask app for the Resturant Management System.
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
# Import services here
from services.ping.ping import ping
from services.database.database import database
from services.menu.menu import menu
from services.authentication.authentication import authentication
from services.order.order import order
from services.orders.orders import orders
from services.notifications.notifications import notifications

# Flask Set Up
app = Flask(__name__)
CORS(app)

# Service calling blocks

"""
Router for the `ping` endpoint.
"""
@app.route("/ping")
def handlePing():
    pObj = ping(request)
    return jsonify(pObj.getResponse())

"""
Router for the `database` endpoint.
"""
@app.route("/database")
def handleDatabase():
    dObj = database(request)
    return jsonify(dObj.getResponse())

"""
Router for the `menu` endpoint.
"""
@app.route("/menu/<path:path>", methods=['GET', 'POST'])
def handleMenu(path):
    menuObj = menu(request)
    return jsonify(menuObj.getResponse())

"""
Router for the `authentication` endpoint.
"""
@app.route("/authentication/<path:path>", methods=['GET', 'POST'])
def handleAuth(path):
    authObj = authentication(request)
    return jsonify(authObj.getResponse())

"""
Router for the `order` endpoint.
"""
@app.route("/order/<path:path>", methods=['GET', 'POST'])
def handleOrder(path):
    orderObj = order(request)
    return jsonify(orderObj.getResponse())

"""
Router for the `orders` endpoint.
"""
@app.route("/orders/<path:path>", methods=['GET', 'POST'])
def handleOrders(path):
    ordersObj = orders(request)
    return jsonify(ordersObj.getResponse())

"""
Router for the `notifictions` endpoint.
"""
@app.route("/notifications/<path:path>", methods=['GET', 'POST'])
def handleNotifications(path):
    notifObj = notifications(request)
    return jsonify(notifObj.getResponse())


if __name__ == '__main__':
    app.run(host='0.0.0.0')

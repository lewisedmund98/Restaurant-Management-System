from flask import Flask, request, jsonify
from flask_cors import CORS
# Import services here
from services.ping.ping import ping
from services.database.database import database
from services.menu.menu import menu

# Flask Set Up
app = Flask(__name__)
CORS(app)

# Service calling block
@app.route("/ping")
def handlePing():
    pObj = ping(request)
    return jsonify(pObj.getResponse())

@app.route("/database")
def handleDatabase():
    dObj = database(request)
    return jsonify(dObj.getResponse())

@app.route("/menu")
def handleMenu():
    menuObj = menu(request)
    return jsonify(menuObj.getResponse())

if __name__ == '__main__':
    app.run(host='0.0.0.0')

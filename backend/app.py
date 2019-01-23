from flask import Flask, request, jsonify
# Import services here
from services.ping.ping import ping
from services.database.database import database

# Flask Set Up
app = Flask(__name__)

# Service calling block
@app.route("/ping")
def handlePing():
    pObj = ping(request)
    return jsonify(pObj.getResponse())

@app.route("/database")
def handleDatabase():
    dObj = database(request)
    return jsonify(dObj.getResponse())
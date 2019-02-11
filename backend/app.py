from flask import Flask, request, jsonify
from flask_cors import CORS
# Import services here
from services.ping.ping import ping
from services.database.database import database
from services.menu.menu import menu
from services.authentication.authentication import authentication

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


@app.route("/menu/<path:path>", methods=['GET', 'POST'])
def handleMenu(path):
    menuObj = menu(request)
    return jsonify(menuObj.getResponse())


@app.route("/authentication/<path:path>", methods=['GET', 'POST'])
def handleAuth(path):
    authObj = authentication(request)
    return jsonify(authObj.getResponse())


if __name__ == '__main__':
    app.run(host='0.0.0.0')

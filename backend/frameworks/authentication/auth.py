from frameworks.database.db import db
from frameworks.idGenerator.id import id
from argon2 import PasswordHasher
from datetime import datetime
# Important to note that there aren't inherant security features built into 
# this class as it is designed to be called by API handlers. Python also doesn't have
# private methods so there isn't much point designing code to prevent access tokens
# being generate out of sequence as the method can be called anyway 
class authentication():
    def __init__(self):
        instance = db()
        self.__db = instance.getInstance()
        self.__ph = PasswordHasher()
        self.__id = id()

    # Public. Authenticates user against DB and returns bool
    def authenticateUser(self, username, password):
        output = self.__getUser(username)
        try:
            self.__ph.verify(output['password'], password)
        except:
            # Password was wrong
            return False
        return True

    # Takes provided API creds and ensures the user has been previously authenticated 
    # Returns int with HTTP status code
    # 401 - authentication not completed/expired
    # 403 - not permitted for given level
    # 404 - something is not correct
    def authenticateRequest(self, token, secret, uid, level):
        return 

    # Returns a user object
    def __getUser(self, user):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `users` WHERE `username` = %s LIMIT 1;", (user))
        return cursor.fetchone()

    # Generates an access token that can be used to authenticate API requests
    # Needs to be provided to `authenticateRequest`
    def generateAccessToken(self, token, secret, uid):
        if(self.__validateAPICreds(token, secret) == False):
            print("could not fidn")
            return False
        # Gen ID 
        access_id = self.__id.getID("access_")
        cursor = self.__db.cursor()
        cursor.execute("INSERT INTO `userAccess` (`id`, `token`, `time`, `uid`) VALUES (%s, %s, %s, %s);", (access_id, token, int(datetime.now().timestamp()), uid))
        return {"access_token": access_id}

    #  Validates API credentials against the database
    def __validateAPICreds(self, token, secret):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `credsAPI` WHERE `token` = %s AND `secret` = %s;", (token, secret))

        if(cursor.rowcount == 1):
            return True
        else:
            return False
from frameworks.database.db import db
from frameworks.idGenerator.id import id
from argon2 import PasswordHasher
from datetime import datetime, timedelta
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
        output = self.__getUserUsername(username)
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
    def authenticateRequest(self, token, secret, access_tok, uid, level):
        # check creds
        if(self.__validateAPICreds(token, secret) == False):
            return 404
        # find user
        try:
            user = self.__getUserID(uid)
        except: 
            return 404
        # check level
        if(user['level'] > level):
            return 403
        # check provided access token
        try:
            self.__validateAccessToken(access_tok, token, uid)
        except Exception as e:
            print(e)
            return 403
        print("validted")
        # authenticated, return a new access token
        return {"authenticated": True, "new_access_token": self.generateAccessToken(token, secret, uid)}

    ## These can be abstracted to a user class
    # Returns a user object
    def __getUserUsername(self, user):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `users` WHERE `userUsername` = %s", (user))
        if(cursor.rowcount == 1):
            return cursor.fetchone()
        else: 
            raise Exception("User not found")

    # Returns a user object
    def __getUserID(self, user):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `users` WHERE `userID` = %s", (user))
        if(cursor.rowcount == 1):
            return cursor.fetchone()
        else: 
            raise Exception("User not found")

    # Generates an access token that can be used to authenticate API requests
    # Needs to be provided to `authenticateRequest`
    def generateAccessToken(self, token, secret, uid):
        if(self.__validateAPICreds(token, secret) == False):
            return False
        # Gen ID 
        access_id = self.__id.getID("access_")
        cursor = self.__db.cursor()
        cursor.execute("INSERT INTO `userAccess` (`id`, `token`, `time`, `uid`) VALUES (%s, %s, %s, %s);", (access_id, token, int(datetime.now().timestamp()), uid))
        return {"access_token": access_id}

    # Validates existence and correctness of given token including time (2 days)
    def __validateAccessToken(self, access_tok, token, uid):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `userAccess` WHERE `token` = %s AND `uid` = %s ORDER BY `time` DESC;", (token, uid))
        if(cursor.rowcount == 0):
            raise Exception("Invalid access token details")
        else:
            tokDetails = cursor.fetchone()
            # Check most recent token
            if(tokDetails['id'] != access_tok):
                raise Exception("Access token expired")
        # Calculate minimum time 
        minTime = int((datetime.now() - timedelta(days=2)).timestamp())
        if(tokDetails['time'] < minTime):
            raise Exception("Access token expired")
        print("validated")
        return True
    
    #  Validates API credentials against the database
    def __validateAPICreds(self, token, secret):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `credsAPI` WHERE `token` = %s AND `secret` = %s;", (token, secret))

        if(cursor.rowcount == 1):
            return True
        else:
            return False

from frameworks.database.db import db
from argon2 import PasswordHasher

# Important to note that there aren't inherant security features built into 
# this class as it is designed to be called by API handlers. Python also doesn't have
# private methods so there isn't much point designing code to prevent access tokens
# being generate out of sequence as the method can be called anyway 
class authentication():
    def __init__(self):
        instance = db()
        self.__db = instance.getInstance()
        self.__ph = PasswordHasher()

    # Public. Authenticates user against DB and returns bool
    def authenticateUser(self, username, password):
        output = self.__getUser(username)
        try:
            self.__ph.verify(output['password'], password)
        except:
            # Password was wrong
            return False
        return True

    def authenticateRequest(self, token, secret, uid):
        return 

    def __getUser(self, user):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `users` WHERE `username` = %s LIMIT 1;", (user))
        return cursor.fetchone()

    def __generateAccessToken(self, secret, uid):
        
        return
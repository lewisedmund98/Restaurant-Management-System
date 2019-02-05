from frameworks.database.db import db
from argon2 import PasswordHasher

class authentication():
    def __init__(self):
        instance = db()
        self.__db = instance.getInstance()
        self.__ph = PasswordHasher()

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
"""
The main authentication class used for API token validation, logging in and auth token exchanges.

Important to note that there aren't inherent security features built into
this class as it is designed to be called by API handlers. Python also doesn't have
private methods so there isn't much point designing code to prevent access tokens
being generate out of sequence as the method can be called anyway 
"""
from frameworks.database.db import db
from frameworks.idGenerator.id import id
from argon2 import PasswordHasher
from datetime import datetime, timedelta
import time

class authentication():
    """
    The constructor for the authentication class. 

    A valid API `key` and `secret` (here named `token` instead of key) need to be provided. 
    These are used to authenticate API requests from a client. 
    """
    def __init__(self, token, secret):
        # Instantiate other classes
        self.__database = instance = db()
        self.__db = instance.getInstance()
        self.__ph = PasswordHasher()
        self.__id = id()
        # Validate provided credentials
        if self.__validateAPICreds(token, secret) == False:
            raise Exception("Invalid API creds")
        else:
            self.__token = token
            self.__secret = secret

    def authenticateUser(self, username, password):
        """
        User authentication for waiter, kitchen staff or manager.

        :param username: Valid username
        :param password: Valid password

        :returns: `False` on error or `userID` on success. 
        """
        output = self.__getUserUsername(username)
        try:
            self.__ph.verify(output['userPassword'], password)
        except:
            # Password was wrong
            return False
        return output['userID']

    def authenticateRequest(self, access_tok, uid, level):
        """
        Takes provided API creds and ensures the user has been previously authenticated. 

        :param access_tok: should have been previously issued at a valid login
        :param uid: the user ID we are expecting to log in
        :param level: the permissions level of the resource (int)

        :returns: int with HTTP status code
        
        `401` - authentication not completed/expired
        
        `403` - not permitted for given level
        
        `404` - something is not correct (couldn't find the user)
        """ 

        # find user
        try:
            user = self.__getUserID(uid)
        except:
            return 404
        # check level
        if (user['userPrivilegeLevel'] > level):
            return 403
        # check provided access token
        try:
            self.__validateAccessToken(access_tok, self.__token, uid)
        except Exception as e:
            print(e)
            return 403
        # authenticated, return a new access token
        return {"authenticated": True, "new_access_token": self.generateAccessToken(uid)}

    def __getUserUsername(self, user):
        """
        Finds the user from a given username. 
        
        :param user: a valid username
        :returns: User object 
        :raises: User not found exception
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `users` WHERE `userUsername` = %s", (user))
        if (cursor.rowcount == 1):
            return cursor.fetchone()
        else:
            raise Exception("User not found")

    # Returns a user object
    def __getUserID(self, user):
        """
        Finds the user from a given user ID. 
        
        :param user: a valid user ID
        :returns: User object 
        :raises: User not found exception
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `users` WHERE `userID` = %s", (user))
        if (cursor.rowcount == 1):
            return cursor.fetchone()
        else:
            raise Exception("User not found")

    def generateAccessToken(self, uid):
        """
        Generates an access token that can be used to authenticate API requests.
        Needs to be provided to `authenticateRequest`

        :param uid: a valid user ID
        :returns: Access token 
        """
        # Gen ID 
        access_id = self.__id.getID("access_")
        cursor = self.__db.cursor()
        cursor.execute("INSERT INTO `userAccess` (`id`, `token`, `time`, `uid`) VALUES (%s, %s, %s, %s);",
                       (access_id, self.__token, float(time.time()), uid))
        return {"access_token": access_id}

    def __validateAccessToken(self, access_tok, token, uid):
        """
        Validates existence and correctness of given token including time (2 days).

        :param uid: a valid user ID for the token
        :param token: the key the access token was generated with 
        :param access_tok: the access token
        :returns: True on success
        :raises: Invalid access token error
        :raises: Access token expired error
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `userAccess` WHERE `token` = %s AND `uid` = %s ORDER BY `time` DESC;",
                       (token, uid))
        if (cursor.rowcount == 0):
            raise Exception("Invalid access token details")
        else:
            tokDetails = cursor.fetchone()
            # Check most recent token
            if (tokDetails['id'] != access_tok):
                print(tokDetails['id'] + " | " + access_tok)
                raise Exception("Access token expired")
        # Calculate minimum time 
        minTime = int((datetime.now() - timedelta(days=2)).timestamp())
        if (float(tokDetails['time']) < minTime):
            raise Exception("Access token expired")
        return True

    def __validateAPICreds(self, token, secret):
        """
        Validates API credentials against the database

        :param token: the API key/token 
        :param secret: corresponding secret
        :returns: True on success
        :return: False on failure
        """

        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `credsAPI` WHERE `token` = %s AND `secret` = %s;", (token, secret))

        if (cursor.rowcount == 1):
            return True
        else:
            return False

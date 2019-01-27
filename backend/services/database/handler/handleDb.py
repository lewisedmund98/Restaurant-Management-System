import pymysql
from frameworks.database.db import db

class handleDb:
    def __init__(self):
        instance = db()
        self.__db = instance.getInstance()

    def getOutput(self):
        return {"database": self.__getVersion()}

    def __getVersion(self):
        cursor = self.__db.cursor()
        cursor.execute("SELECT VERSION()")
        return cursor.fetchone()
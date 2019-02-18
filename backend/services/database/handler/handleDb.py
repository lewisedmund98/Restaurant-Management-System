from frameworks.database.db import db

class handleDb:
    def __init__(self):
        self.__database = db()
        self.__db = self.__database.getInstance()

    def getOutput(self):
        return {"database": self.__getVersion()}

    def __getVersion(self):
        cursor = self.__db.cursor()
        cursor.execute("SELECT VERSION()")
        value = cursor.fetchone()
        return value
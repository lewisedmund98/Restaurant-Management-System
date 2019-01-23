import pymysql

class handleDb:

    def __init__(self):
        self.__db = pymysql.connect("138.68.169.22","teamproject","test123","teamproject" )

    def getOutput(self):
        return {"database": self.__getVersion()}

    def __getVersion(self):
        cursor = self.__db.cursor()
        cursor.execute("SELECT VERSION()")
        return cursor.fetchone()
import pymysql

class db():
    def __init__(self):
        self.__db = pymysql.connect("138.68.169.22","teamproject","a6ErM22GHr36CUHF","teamproject" )

    def getInstance(self):
        return self.__db
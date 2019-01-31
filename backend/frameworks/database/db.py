import pymysql

class db():
    def __init__(self):
        self.__db = pymysql.connect("178.62.61.46","teamproject","a6ErM22GHr36CUHF","teamproject", cursorclass=pymysql.cursors.DictCursor)

    def getInstance(self):
        return self.__db

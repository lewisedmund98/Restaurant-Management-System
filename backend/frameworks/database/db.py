import pymysql

class db():
    def __init__(self):
        self.__db = pymysql.connect("178.62.61.46","teamproject","a6ErM22GHr36CUHF","teamproject", cursorclass=pymysql.cursors.DictCursor, charset='utf8', autocommit=True)

    def getInstance(self):
        return self.__db

    def __del__(self):
        # Close connection on destruction
        self.__db.close()
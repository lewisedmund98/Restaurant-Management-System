from frameworks.database.db import db
from frameworks.item.item import item
class items():
    def __init__(self):
        self.__database = instance = db()
        self.__db = instance.getInstance()

    def load(self):
        ids = self.__getIds()
        self.list = []
        for s in ids:
            item0 = item()
            item0.load(s['itemID'])
            self.list.append(item0.get())
        return


    def get(self):
        return self.list

    def __getIds(self):
        cursor = self.__db.cursor()
        cursor.execute('SELECT itemID FROM menuItems;')
        data = cursor.fetchall()
        return data

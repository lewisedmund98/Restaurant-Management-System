from frameworks.database.db import db
from frameworks.item.item import item
class items():
    def __init__(self):
        self.__database = instance = db()
        self.__db = instance.getInstance()

    def __load(self, enabled=None):
        ids = self.__getIds()
        self.__list = []

        for s in ids:
            if(enabled and s['itemEnabled'] == 1):
                self.__addItemID(s['itemID'])
            elif(not enabled and s['itemEnabled'] == 0):
                self.__addItemID(s['itemID'])
            elif(enabled == None):
                self.__addItemID(s['itemID'])
        return

    def __addItemID(self, itemID):
        item0 = item()
        item0.load(itemID)
        self.__list.append(item0.get())
        return True
    
    def load(self):
        self.__load()

    def loadEnabled(self):
        self.__load(True)

    def loadDisabled(self):
        self.__load(False)

    def get(self):
        return self.__list

    def __getIds(self):
        cursor = self.__db.cursor()
        cursor.execute('SELECT itemID, itemEnabled FROM menuItems;')
        data = cursor.fetchall()
        return data

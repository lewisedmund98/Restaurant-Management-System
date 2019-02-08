import pymysql
from frameworks.item.item import item

class handleItem:
    def __init__(self, request):
        self.__data = request
        self.__item = item() 

    def getOutput(self):
        return {"result": self.getItem()}

    def getItem(self):
<<<<<<< HEAD
        print(self.__data['id'])
        item.load(self, self.__data['id'])
        return item.data 

    def printMenu(self):
        if(self.__data['id']):
            cursor = self.__db.cursor()
            cursor.execute("SELECT * FROM teamproject.menuItems WHERE teamproject.menuItems.itemID = %s;", (self.__data['id']))
            return cursor.fetchall()
=======
        self.__item.load(self.__data.get_json()['id'])
        return self.__item.get()
>>>>>>> eb69609d95b696136af1c885d07d8f0065739ec5

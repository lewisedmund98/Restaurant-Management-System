from frameworks.database.db import db
from frameworks.idGenerator.id import id
from datetime import datetime, timedelta
import json

class notifications:

    def __init__(self):
        # Instatiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()
        # Instantiate ID
        self.__id = id()
    
    def createNotification(self, table, type, meta):
        cursor = self.__db.cursor()
        nID = self.__id.getID("notification_")
        cursor.execute("INSERT INTO `notifications` (`id`, `table`, `inserted`, `retrieved`, `type`, `meta`) VALUES (%s, %s, %s, null, %s, %s);", (nID, table, int(datetime.now().timestamp()), type, json.dumps(meta)))
        return nID

    def getNotification(self, id):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `notifications` WHERE `id` = %s", (id))
        return cursor.fetchone()
    
    def getUnreadByTable(self, table):
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `notifications` WHERE `table` = %s AND `retrieved` IS NULL;", (table))
        data = cursor.fetchall()
        
        for record in data:
            self.__markRead(record['id'])
        return data

    def __markRead(self, id):
        cursor = self.__db.cursor()
        cursor.execute("UPDATE `notifications` SET `retrieved` = %s WHERE `id` = %s;", (int(datetime.now().timestamp()), id))
        return id
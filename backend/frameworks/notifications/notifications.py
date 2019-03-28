from frameworks.database.db import db
from frameworks.idGenerator.id import id
from datetime import datetime, timedelta
import json

class notifications:
    """
    Notifications class to support sending arbitory notifications to and from the customer and resturant staff. 
    """
    def __init__(self):
        # Instatiate Database
        self.__database = instance = db()
        self.__db = instance.getInstance()
        # Instantiate ID
        self.__id = id()
    
    def createNotification(self, table, type, meta):
        """
        Creates a notification for a customer to the waiter. 

        :param table: table number that has created the notification
        :param type: type of notification that has been made
        :param meta: metadata JSON
        :returns: notification ID
        """
        cursor = self.__db.cursor()
        nID = self.__id.getID("notification_")
        cursor.execute("INSERT INTO `notifications` (`id`, `table`, `inserted`, `retrieved`, `type`, `meta`) VALUES (%s, %s, %s, null, %s, %s);", (nID, table, int(datetime.now().timestamp()), type, json.dumps(meta)))
        return nID

    def getNotification(self, id):
        """
        Get's the notifiation data. 

        :param id: valid notification ID
        :returns: dict of notification data
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `notifications` WHERE `id` = %s", (id))
        return cursor.fetchone()
    
    def getUnreadByTable(self, table):
        """
        Get's unread notifications by the table that created them. 

        Also marks all of these notifications read.

        :param table: table number to filter by
        :returns: dict of notification data 
        """
        cursor = self.__db.cursor()
        cursor.execute("SELECT * FROM `notifications` WHERE `table` = %s AND `retrieved` IS NULL;", (table))
        data = cursor.fetchall()
        
        for record in data:
            self.__markRead(record['id'])
        return data

    def __markRead(self, id):
        """ 
        Helper method to mark notifications as read (ie. they have a retrieved timestamp).

        :param id: ID to mark as read
        :returns: the ID that has been marked as read
        """
        cursor = self.__db.cursor()
        cursor.execute("UPDATE `notifications` SET `retrieved` = %s WHERE `id` = %s;", (int(datetime.now().timestamp()), id))
        return id
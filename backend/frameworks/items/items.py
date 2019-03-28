from frameworks.database.db import db
from frameworks.item.item import item
class items():
    """
    Items class which uses `item` class. Includes various helper methods. 
    """
    def __init__(self):
        self.__database = instance = db()
        self.__db = instance.getInstance()

    def __load(self, enabled=None):
        """
        Loads items into the class. 

        :param enabled: Optional selector used to select enabled, disabled or all items
        """
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
        """
        Helper for loading items into the class list. 
        
        :param itemID: item ID to create an Item object and append to the class list.
        """
        item0 = item()
        item0.load(itemID)
        self.__list.append(item0.get())
        return True
    
    def load(self):
        """
        Load all items.
        """
        self.__load()

    def loadEnabled(self):
        """
        Load enabled items.
        """
        self.__load(True)

    def loadDisabled(self):
        """
        Load disabled items. 
        """
        self.__load(False)

    def get(self):
        """
        Getter for the loaded items. 
        
        :returns: List of Item objects.
        """
        return self.__list

    def __getIds(self):
        """
        Get's all the item IDs. 

        :returns: dict of item IDs 
        """
        cursor = self.__db.cursor()
        cursor.execute('SELECT itemID, itemEnabled FROM menuItems;')
        data = cursor.fetchall()
        return data
    
    def setItemsToggle(self, items):
        """
        Sets the toggle for supplied item and toggle pairs. 

        :param items: dict of `itemID` and `enabled` pairs, where `enabled` is `True` or `False` depending. 
        """
        for item in items:
            self.__itemSetToggle(item['itemID'], item['enabled'])
        return True
            
    def __itemSetToggle(self, itemID, value):
        """
        Helper to set toggle for supplied item and toggle pair. 

        :param itemID: item ID to set toggle for 
        :param value: bool as to whether item is enabled
        """
        cursor = self.__db.cursor()
        cursor.execute('UPDATE `menuItems` SET `itemEnabled` = %s WHERE `itemID` = %s;', (value, itemID))
        return True

    def updateItem(self, itemID, fields):
        """
        Updates an item with the supplied fields. 

        :param itemID: the item ID to update
        :param fields: dict of fields with attributes for the item and value pairs. 
        """
        cursor = self.__db.cursor()
        cursor.execute('UPDATE `menuItems` SET `itemName` = %s, `itemCalories` = %s, `itemPrice` = %s, `itemType` = %s, `itemInformation` = %s, `itemEnabled` = %s, `itemImage` = %s WHERE `itemID` = %s;', 
            (fields['itemName'], fields['itemCalories'], fields['itemPrice'], fields['itemType'], fields['itemInformation'], fields['itemEnabled'], fields['itemImage'], itemID)
        )

        return True
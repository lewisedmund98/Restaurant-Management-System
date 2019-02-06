import cuid

class id():
    def __init__(self):
        self.__g = cuid.CuidGenerator()

    def getID(self, prefix):
        return prefix + self.__g.cuid()
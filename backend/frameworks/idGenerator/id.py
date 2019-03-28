import cuid

class id():
    """
    Wrapper for `cuid`. 
    """
    def __init__(self):
        self.__g = cuid.CuidGenerator()

    def getID(self, prefix):
        """
        Wrapper for `cuid` with custom prefix.

        :param prefix: Prefix to append CUID ID with
        :returns: unique ID string 
        """
        return prefix + self.__g.cuid()
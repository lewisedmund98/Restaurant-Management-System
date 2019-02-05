import pytest

@pytest.fixture
def authClass():
    from frameworks.authentication.auth import authentication
    return authentication()

def testauthTrue(authClass):
    assert authClass.authenticateUser("test", "s3kr3tp4ssw0rd") == True

def testauthFalse(authClass):
    assert authClass.authenticateUser("test", "r@nd0m") == False

def testAuthGenAccessTokFalse(authClass):
    assert authClass.generateAccessToken("random", "random", "asdasd123123") == False

def testAuthGenAccessTokTrue(authClass):
    assert isinstance(authClass.generateAccessToken("abc123", "def456", "asdasd123123"), dict)
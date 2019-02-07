import pytest

@pytest.fixture
def authClass():
    from frameworks.authentication.auth import authentication
    return authentication()

def testauthTrue(authClass):
    assert isinstance(authClass.authenticateUser("abc123", "def456", "test", "s3kr3tp4ssw0rd"), str)

def testauthFalse(authClass):
    assert authClass.authenticateUser("abc123", "def456", "test", "r@nd0m") == False

def testAuthGenAccessTokFalse(authClass):
    assert authClass.generateAccessToken("random", "random", "asdasd123123") == False

def testAuthGenAccessTokTrue(authClass):
    assert isinstance(authClass.generateAccessToken("abc123", "def456", "asdasd123123"), dict)

def testAuthRequestNoUser(authClass):
    assert authClass.authenticateRequest("abc123", "def456", "n/a" , "random", 0) == 404

def testAuthRequestUserWrongLevel(authClass):
    assert authClass.authenticateRequest("abc123", "def456", "n/a", "asdasd123123", -1) == 403

def testAuthFullFlow(authClass):
    assert isinstance(authClass.authenticateUser("abc123", "def456", "test", "s3kr3tp4ssw0rd"), str)
    token = authClass.generateAccessToken("abc123", "def456", "asdasd123123")
    assert isinstance(authClass.authenticateRequest("abc123", "def456", token['access_token'], "asdasd123123", 0), dict)
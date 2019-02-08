import pytest

@pytest.fixture
def authClass():
    from frameworks.authentication.auth import authentication
    return authentication("abc123", "def456")

def testauthTrue(authClass):
    assert isinstance(authClass.authenticateUser("test", "s3kr3tp4ssw0rd"), str)

def testauthFalse(authClass):
    assert authClass.authenticateUser("test", "r@nd0m") == False

def testAuthGenAccessTokTrue(authClass):
    assert isinstance(authClass.generateAccessToken("asdasd123123"), dict)

def testAuthRequestNoUser(authClass):
    assert authClass.authenticateRequest("n/a" , "random", 0) == 404

def testAuthRequestUserWrongLevel(authClass):
    assert authClass.authenticateRequest("n/a", "asdasd123123", -1) == 403

def testAuthFullFlow(authClass):
    assert isinstance(authClass.authenticateUser("test", "s3kr3tp4ssw0rd"), str)
    token = authClass.generateAccessToken("asdasd123123")
    assert isinstance(authClass.authenticateRequest(token['access_token'], "asdasd123123", 0), dict)
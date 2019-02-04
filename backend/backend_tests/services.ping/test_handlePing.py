import pytest

@pytest.fixture
def pingHanlder():
    from services.ping.handler.handlePing import handlePing
    return handlePing()

def test_ping(pingHanlder):
    assert pingHanlder.getOutput() == {"ping": "pong"}

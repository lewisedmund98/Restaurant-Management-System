import pytest


@pytest.fixture
def notificationsClass():
    from frameworks.notifications.notifications import notifications
    return notifications()


def testCreateNotification(notificationsClass):
    assert isinstance(notificationsClass.createNotification(1, "call", {}), str)

def testCreateAndGetByID(notificationsClass):
    id = notificationsClass.createNotification(1, "call", {})
    assert isinstance(id, str)
    record = notificationsClass.getNotification(id)
    assert record['id'] == id
    assert record['table'] == 1
    assert record['type'] == "call"
    assert record['retrieved'] == None

def testCreateAndRetrieve(notificationsClass):
    id1 = notificationsClass.createNotification(3, "call", {})
    id2 = notificationsClass.createNotification(3, "call", {})

    records = notificationsClass.getUnreadByTable(3)

    assert len(records) == 2
    assert records[0]['id'] == id1
    assert records[1]['id'] == id2
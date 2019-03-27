import React from 'react';
import NotificationModal from './NotficationView';

/**
 * The notifications class is where the notifications are handled. The notifications are requested
 * from the waiter page controller and the data is passed to this class where it is then mapped to
 * "notificationView" components. This handles unique elements but only is used to display the notifications
 * 
 */

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.notificationList = [];
        this.addNotification = this.addNotification.bind(this);
        this.checkUniqueElement = this.checkUniqueElement.bind(this);
        this.displayedList = [];
        this.state = {
            displayedNotificiations: []
        }
    }

    /**
     * This method takes a list of notifications from the waiter page controller and checks
     * whether they exist in the current list of notifications. 
     * 
     * If they do exist in the current list it moves to the next one in the list
     * 
     * If they don't exist then it adds it to the displayed list which are the notifications to be displayed
     * @param {notification list} notifications 
     */

    addNotification(notifications) {
        notifications.forEach(element => {
            if (this.checkUniqueElement(element)) {     
                    this.displayedList.push(element);
            }
        });
    }

    /**
     * Checks whether or not the element passed as an argument is unique to the displayed list
     * 
     * If it is unique -> There has been no match -> Returns true
     * @param {the element to be matched with the displayed list} element 
     */

    checkUniqueElement(element) {
        for (var i = 0; i < this.displayedList.length; i++) {
            if (this.displayedList[i] === element) {
                return false;
            }
        }
        return true;
    }

    /**
     * Takes a list of notifications and then maps it to individual NotificationModel components
     * 
     * @param {list of displayable notifications} displayedList 
     */

    mapNotifications(displayedList) {
        var mappedList = displayedList.map((element) => {
            return (
                <NotificationModal timeCreated={element.inserted} tableNumber={element.table}></NotificationModal>
            )
        })
        return mappedList; // Finally mapped list
    }

    render() {
        if (this.props.notifications) { // Checks if the notifications list is empty or undefined
            this.addNotification(this.props.notifications); // Adds the notificaiton to the list (which checks unique)
            var mappedList = this.mapNotifications(this.displayedList); // Renders the notifications
        }

        return (
            <ul>
                {mappedList} {/*Renders the mapped list*/}
            </ul>
        )
    }
}
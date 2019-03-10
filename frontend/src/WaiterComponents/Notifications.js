import React from 'react';
import NotificationModal from './NotficationView';


export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.notificationList = [];
        this.doSomething = this.doSomething.bind(this);
        this.checkUniqueElement = this.checkUniqueElement.bind(this);
        this.displayedList = [];
        this.state = {
            displayedNotificiations: []
        }
    }

    doSomething(notifications) {
        
        notifications.forEach(element => {
            if (this.checkUniqueElement(element)) {
                // Show
                // Add to list
                console.log("Notify : table " + element.table + " is in need of assistance");
                this.displayedList.push(element);
            }
        });
    }

    checkUniqueElement(element) {
        for (var i = 0; i < this.displayedList.length; i++) {
            if (this.displayedList[i] === element) {
                return false;
            }
        }
        return true;

    }

    mapNotifications(displayedList){
        var mappedList = displayedList.map((element) => {
            return(
                <NotificationModal></NotificationModal>
            )
        })

        return mappedList;
    }

    render() {
        console.log(this.state.displayedNotificiations);
        if(this.props.notifications){
            this.doSomething(this.props.notifications);
            var mappedList = this.mapNotifications(this.displayedList);
        }
        console.log("Displayed List: ");
        console.log(this.displayedList);
        return (
            <ul>
                {mappedList}
            </ul>
        )
    }
}
import React from 'react';


export default class Notifications extends React.Component{
    constructor(props){
        super(props);
        this.notificationList = [];
        this.doSomething = this.doSomething.bind(this);    
        this.checkUniqueElement = this.checkUniqueElement.bind(this);
        this.displayedList = [];
    }

    doSomething(notifications){
        notifications.forEach(element => {
            if(this.checkUniqueElement(element)){
                // Show
                // Add to list
                console.log("Notify : table " + element.table + " is in need of assistance");
                console.log(element);
                this.displayedList.push(element);
            }
        });
    }

    checkUniqueElement(element){
        for(var i=0; i<this.displayedList.length; i++){
            if(this.displayedList[i] === element){
                return false;
            }
        }

        return true;

    }
    
    render(){
        console.log(this.props.notifications);
        if(this.props.notifications){
            this.doSomething(this.props.notifications);
        }
        return(
            <h1>Nothing</h1>
        )
    }
}
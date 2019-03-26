import React from 'react';
import KitchenItemsView from "./KitchenItemsView";
import { Card, Button } from 'semantic-ui-react';

/**
 * Kitchen page wrapper deals with taking the data from the kitchen page controller and turning it
 * into some viewable components. 
 * 
 * it mainly does this through use of javascript array mapping and makes components into 
 * kitchen items views and individual tables.
 * 
 */

export default class KitchenPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.mappedWaiterConfirm = this.mappedWaiterConfirm.bind(this);
        this.mapKitchenItems = this.mapKitchenItems.bind(this);
        this.mapKitchenToBeCompleted = this.mapKitchenToBeCompleted.bind(this);
        this.eta = null; // Eta is an integer which can stay null
    }

    /**
     * Calls the parent method "kitchenConfirmOrder" which causes the order ID to be confirmed
     * 
     * This is a method based on a click event on the confirm button 
     * 
     * @param {order id to be confirmed} orderID 
     */

    handleKitchenConfirm(orderID) {
        this.props.kitchenConfirmOrder(orderID, this.eta);
    }

    /**
     * Calls the parent method to complete the order
     * 
     * This is a method which is event based and the complete order button calls this method on click
     * @param {order Id to be completed, to become delivereable} orderID 
     */

    handleKitchenComplete(orderID) {
        this.props.completeOrder(orderID);
    }

    /**
     * Takes a list of waiter confirmed orders and then chooses how to display
     * each one into a react component.
     * 
     * Right now each of the orders are being shown in cards as they are large and easily seen
     * 
     * @param {list of waiter confirmed orders to be displayed} waiterConfirmed 
     */

    mappedWaiterConfirm(waiterConfirmed) {
        var moment = require('moment'); // Time library
        var time;
        var mappedCards = waiterConfirmed.map((element) => { // For each of the waiter confirmed orders
            var mappedKitchenItems = this.mapKitchenItems(element.menuItems);  // Take the menu items and map it
            time = moment.unix(element.timeCreated).format("hh:mm a"); // Converts unix time to normal time
            return (
                <Card className="kitchenCard">
                    <Card.Content>
                        <h5>{element.orderID}</h5>
                        {mappedKitchenItems}
                        <h5>{time}</h5>
                    </Card.Content>
                    <Card.Content extra>
                        <div id="kitchenOrderButtons">
                            <div id="kitchenTimeButtons">
                                {/*These buttons handle the ETA clicks they set the value according to button*/}
                                <Button className="kitchenTimeButton" onClick={() => { this.eta = 5 }}>05</Button>
                                <Button className="kitchenTimeButton" onClick={() => { this.eta = 10 }}>10</Button>
                                <Button className="kitchenTimeButton" onClick={() => { this.eta = 20 }}>20</Button>
                                <Button className="kitchenTimeButton" onClick={() => { this.eta = 30 }}>30</Button>
                                {/*When this button is clicked it goes to the kitchen confirm as these are "waiterConfirmed*/}
                                <Button onClick={() => { this.handleKitchenConfirm(element.orderID) }}
                                    id="kitchenConfirmButton">Confirm</Button>
                            </div>
                        </div>
                    </Card.Content>
                </Card>
            )
        });
        return mappedCards;
    }

    /**
     * Takes the menu items and then produces a react component for each of them
     * Calls the KitchenItemsView for this to be displayed
     * 
     * @param {a list of menu items (json objects)} menuItems 
     */

    mapKitchenItems(menuItems) {
        var mappedItems = menuItems.map((item) => {
            return (
                <KitchenItemsView itemImage={item.itemImage} itemName={item.itemName}></KitchenItemsView>
            )
        });
        return mappedItems;
    }

    /**
     * Takes a list of kithcen confirmed orders and then chooses how to display
     * each one into a react component. These orders are also in the state "toBeCompleted"
     * 
     * Right now each of the orders are being shown in cards as they are large and easily seen
     * 
     * @param {list of kitchen confirmed orders to be displayed ie to be completed} toBeCompleted 
     */

    mapKitchenToBeCompleted(toBeCompleted) {
        var moment = require('moment'); // Time library to use to convert
        var time;
        var mappedCards = toBeCompleted.map((element) => {
            var mappedKitchenItems = this.mapKitchenItems(element.menuItems);
            time = moment.unix(element.timeCreated).format("hh:mm a"); // Convert unix -> normal
            return (
                <Card className="kitchenCard" >
                    <Card.Content>
                        <h5>{element.orderID}</h5>
                        {mappedKitchenItems}
                        <h5>{time}</h5>
                    </Card.Content>
                    <Card.Content extra>
                        <div id="kitchenOrderButtons">
                        {/*Only needs one button which is to complete the order*/}
                            <Button onClick={() => { this.handleKitchenComplete(element.orderID) }}
                                id="kitchenConfirmButton">Complete Order</Button>
                        </div>
                    </Card.Content>
                </Card>
            )
        });
        return mappedCards;
    }


    render() {
        // Check if the arrays are empty and if they aren't then map them
        // Otherwise there would be an undefined error
        if (this.props.waiterConfirmed) {
            var mappedWaiter = this.mappedWaiterConfirm(this.props.waiterConfirmed);
        }

        if (this.props.toBeCompleted) {
            var mappedToBeCompleted = this.mapKitchenToBeCompleted(this.props.toBeCompleted);
        }
        return (

            <React.Fragment>
                <div className="waiterConfirmedSide" >
                    <h1>Waiter Confirmed</h1>
                    <Card.Group>
                        {mappedWaiter}
                    </Card.Group></div>
                <div className="toBeCompletedSide" >
                    <h1>To be Completed</h1>
                    <Card.Group>
                        {mappedToBeCompleted}
                    </Card.Group>
                </div>
            </React.Fragment>
        )
    }
}
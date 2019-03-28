import React from 'react';
import KitchenPageWrapper from "./KitchenPageWrapper";
import {Dimmer, Icon} from 'semantic-ui-react';
var request = require('../Requests');

/**
 * The kitchen page controller handles the requests and fetching and handling of the data. The class also handles async
 * interactions for the buttons and displays the correct components on the page. 
 * 
 * The kitchen page controller gets the waiter confirmed orders then has that rendered along with buttons
 * for the kitchen to confirm those orders with an ETA. 
 * 
 * The kitchen confirmed orders then go to the kitchen confirmed page which is on the kitchen page too. 
 * 
 * 
 */

export default class KitchenPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // State variables including the arrays for the data and the access token
            waiterConfirmed: [],
            toBeCompleted: [],
            showDimmer : true,
            accessToken: this.props.accessToken
        };
        this.waiterConfirmedArray = [];
        this.toBeCompletedArray = [];
        this.getWaiterConfirmed = this.getWaiterConfirmed.bind(this);
        this.kitchenConfirmOrder = this.kitchenConfirmOrder.bind(this);
        this.kitchenCompleteOrder = this.kitchenCompleteOrder.bind(this);
        this.checkForUpdate = this.checkForUpdate.bind(this);
        this.getKitchenConfirmed = this.getKitchenConfirmed.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidMount() { // When the component is loaded start running requests
        this.startTimer(500);
    }

    /**
     * Starts making requests by using the set timeout function adn calling check for update in javascript
     * The time you pass is time time it will wait before it makes more requests. 
     * 
     * CheckForUpdates will call start timer when it has done with it's code execution
     * 
     * @param {the delay for the requests in milliseconds} delay 
     */

    startTimer(delay) { 
        setTimeout(() => {
            this.checkForUpdate(); 
        }, delay);
    }

    /**
     * Runs the code which makes the requests, and also checks if the access token has been set
     * by the parent class
     */

    async checkForUpdate() {
        if (this.props.accessToken) {
            this.getWaiterConfirmed(); // Getting the waiter confirmed list (fetch call)
            this.getKitchenConfirmed(); // Getting the orders confirmed by the kitchen page (this page)
        }
        this.startTimer(5000); // Restart the timeout period so that it "polls" the requests
    }

    /**
     * This method uses fetch calls and the method "addRequest" in the kitchen class which adds this
     * to the requests
     * 
     * getting the waiter  confirmed orders is a authed request so much be added to the queue
     * 
     * It then sets the state with the new data
     */

    async getWaiterConfirmed() {
        this.props.addRequest("orders/list/waiterConfirmed", null, async (result) => {
            result = result.orders; // Get the orders from JSON
            for (const order of result) { // For all the orders
                await request.getMenuItems(order.items) // Fetch the menu item details
                    .then((menuItems) => {
                        var menuItemsArray = [];
                        for (var i = 0; i < menuItems.length; i++) {
                            menuItemsArray.push(menuItems[i].result);
                        }
                        var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };
                        this.waiterConfirmedArray.push(combinedResult);
                    })
            }
            this.setState({ // Set the state with the data received
                waiterConfirmed: this.waiterConfirmedArray,
                showDimmer : false
            })
            this.waiterConfirmedArray = []; // Reset the array
        })
    }

    /**
     * Get kitchen confirmed gets the orders which have been confirmed by the kitchen, this
     * is the last stage before the waiter can deliver the order. 
     * 
     * It uses the endpoint "order/list/kitchenConfirmed"
     * 
     * It's method functionality is very similar to "this.getWaiterConfirmed"
     */ 

    async getKitchenConfirmed() {
        this.props.addRequest("orders/list/kitchenConfirmed", null, async (result) => {
            result = result.orders;
            for (const order of result) {
                await request.getMenuItems(order.items) // Pass Items
                    .then((menuItems) => {
                        var menuItemsArray = [];
                        for (var i = 0; i < menuItems.length; i++) {
                            menuItemsArray.push(menuItems[i].result);
                        }
                        var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };
                        this.toBeCompletedArray.push(combinedResult);
                    })
            }
            this.setState({
                toBeCompleted: this.toBeCompletedArray,
                showDimmer : false
            })
            this.toBeCompletedArray = [];
        })
    }

    /**
     * Confirms an order on the kitchen side. This is the left hand table on the webpage
     * 
     * Takes an order id and then sends a request to the backend to confirm it.
     * 
     * It is possible to pass an ETA {5,10,20,30} to this, however it is optional and will work without
     * 
     * @param {the order id to be confirmed by the kitchen} orderID 
     * @param {eta as a number, NULL if no eta} eta 
     */

    async kitchenConfirmOrder(orderID, eta) {
        var reqBody;
        if (eta !== null) { // Check if eta has been passed
            reqBody = { order_id: orderID, eta: eta }; // Construct body data with ETA
        } else { 
            reqBody = { order_id: orderID } // Body data without ETA
         }
        // await fetch("https://flask.team-project.crablab.co/order/kitchenConfirm", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(reqBody)
        // })
        //     .then(response => response.json())
        //     .then(json => console.log(json))
        this.props.addRequest("order/kitchenConfirm", reqBody, (json) => {
            console.log(json);
        })
    }

    /**
     * Method to handle when the kitchen has completed a dish, they can then click the
     * kitchen confirm button which sends data to this method
     * 
     * This takes the state from "kitchenConfirmed -> ToBeDelivered" 
     * 
     * The item will go back to the waiter page after the process on this page is complete
     * 
     * @param {order ID to be completed by the kitchen} orderID 
     */

    async kitchenCompleteOrder(orderID) {
        // await fetch("https://flask.team-project.crablab.co/order/kitchenComplete", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ id: orderID })
        // })
        //     .then(response => response.json())
        //     .then(json => console.log(json))
        this.props.addRequest("order/kitchenComplete", {order_id: orderID}, (json) => {
            console.log(json);
        })
    }

    render() {
        return (
            <div>
                <Dimmer active={this.state.showDimmer}>
                    <Icon loading name='spinner' size='huge' />
                </Dimmer>
                {/*Render a kitchen page wrapper and pass it all the details from the requests*/}
                <KitchenPageWrapper completeOrder={this.kitchenCompleteOrder} toBeCompleted={this.state.toBeCompleted}
                 kitchenConfirmOrder={this.kitchenConfirmOrder} waiterConfirmed={this.state.waiterConfirmed} />
            </div>
        )
    }
}
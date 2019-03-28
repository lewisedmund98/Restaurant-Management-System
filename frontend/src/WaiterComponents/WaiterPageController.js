/**
 * The waiter page controller is the component which deals with polling the API requests.
 * There are several requests it needs to make. 
 * 
 * The first of which is the unconfirmed orders.
 * 
 * The next is the To be delivered
 * 
 * The next are the unpaid orders
 * 
 * This class also handles the async life requests which occur such as the methods for cancelling an order, confirming or
 * or delivering an order and makes requests for either of these.
 * 
 * BEcause of the aysnc nature of the code written but the method in which requests for logged in members of staff are made
 * there has been a lot of work gone into making the methods sync with eachother.
 * 
 * To make requests which involve an access ttoken to be added, the request must be added the method "addRequest" given
 * as a property to this class with a subsequent callback for that method once the completion has occured. Please note, the
 * request is added to a queue and may take some time to complete as the queue is FIFO.
 * 
 * The data from these are passed to the WaiterPageWrapper which deals with mapping the data from
 * the requests to the View elements. 
 
 */

import React from 'react';
import { Dimmer, Icon } from 'semantic-ui-react';
import WaiterPageWrapper from './WaiterPageWrapper.js';
import Notifications from './Notifications.js'; // Imports the notification components
import EditMenu from './EditMenu.js'; // Imports the edit menu compoentns
var request = require('../Requests'); // Pulls the requests class to be used in some of the unauthed requests.

export default class WaiterPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unconfirmedOrders: [], // List of final unconfirmed orders each poll
            toBeDelivered: [], // List of final deliverable orders each poll
            unPaid: [], // list of all unpaid orders each poll
            notifications: [], // list of notifications from endpoint
            showDimmer: true, // dimmer is the loader component
        };
        this.arrayOfUnconfirmedOrders = []; // This is needed as updating the state each request is unfeesible
        this.toBeDeliveredArray = []; // Used to properly update the state
        this.unpaidArray = []; // Used to porperly update the state.
        /**
         * Method bindings
         */
        this.getUnconfirmedOrders = this.getUnconfirmedOrders.bind(this);
        this.getKitchenCompleted = this.getKitchenCompleted.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
        this.getUnpaidOrders = this.getUnpaidOrders.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.deliverOrder = this.deliverOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
        this.unmounted = false;
    }

    componentDidMount() { // Runs when the component is mounted
        this.unmounted = false;
        this.startTimer(500); // Starts the request "timer" to go off which loops. Starts it at a small time period
    
    }

    componentWillUnmount() {
        // Do some unmount logic, clearing network requests, clearing dom elements etc etc.
        this.unmounted =true; 
    }

    /**
     * This method runs the check for update method which then makes the requests based on the access token
     * A timeout is used because it lets the code run before going on and starting again meaning there won't be any
     * nasty race conditions in the access token logic
     * 
     * @param {time to next update to be made in milliseconds} interval 
     */

    startTimer(interval) {
        setTimeout(() => {
            this.checkForUpdate(); // Calls check which makes the requests.
        }, interval);
    }

    /**
     * This method checks if the access token has been set by the parent class (waiter.js) 
     * and if it has been set then this runs the requests. This function makes calls which adds to the request queue but
     * the request queue removes duplicates so only one unique request is on it at once. 
     */

    async checkForUpdate() {
        if (this.props.accessToken && this.unmounted===false) { // Checks if the access token has been set
            this.getUnconfirmedOrders();
            this.getKitchenCompleted();
            this.getUnpaidOrders();
            for (var i = 0; i < this.props.selectedTables.length; i++) { // For each "selected table" which is passed as props
                this.getNotifications(this.props.selectedTables[i]); // Runs this request for i tables
            }
        }
        this.startTimer(5000); // Once the code has run this makes sure the code is run again 5 seconds later, polling.
    }

    /**
     * getNotifications takes a table number and then adds a request to the queue of requests which then 
     * returns a list of notifications for a given table
     * 
     * This is an asynchronous function and most of the logic to handle the request data is in the call back method.
     * 
     * @param {The table number to make the request with} table 
     */

    async getNotifications(table) {
        this.props.addRequest("notifications/listTable", { table: table }, (json) => { // Adds a request passing it data
            var tempArray = this.state.notifications; // Takes the current notifications into a temp array to be used locally
            if (json.results.length > 0) { // If there is a new notification
                json.results.forEach((notification) => { // Add it to the current list which will be passed
                    tempArray.push(notification);
                })
            }
            this.setState({
                notifications: tempArray // Set the state with the new array
            });
        })
    }

    /**
     * This method adds a request to pull the unconfirmed orders from the endpoint. The call back in this
     * function then takes the data that is passed back from the request and parses it into an array. THere
     * is extra logic which is because not all the information needed is passed from the first request so there
     * has to be some more asynchronouse requests to ensure all of the data is added.
     * 
     */

    async getUnconfirmedOrders() {
        this.props.addRequest("orders/list/waiterUnconfirmed", null, async (data) => { // No data to be passed
            data = data.orders; // Pulls the orders from the data json object
            for (const order of data) { // Loops over each order.
                await request.getMenuItems(order.items) // REQUEST TO FETCH ALL MENU ITEMS PER ORDER
                    .then(async (menuItems) => {
                        var menuItemsArray = [];
                        for (var i = 0; i < menuItems.length; i++) { // For each RETURNED menu item, push it's result to array
                            menuItemsArray.push(menuItems[i].result); // Each result is a JSON object in itself.
                        }
                        // Combines the: order data, the customer data, and the menu items into 1 JSON object
                        var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };
                        this.arrayOfUnconfirmedOrders.push(combinedResult); // Push the combined object to the array
                    })

            }
            this.setState({
                unconfirmedOrders: this.arrayOfUnconfirmedOrders, // Set the state which updates react and it gets rendered
                showDimmer: false // Because some details have loaded, remove dimmer.
            })
            this.arrayOfUnconfirmedOrders = []; // Reset the global array otherwise the data will duplicate.
        })
    }

    /**
     * Makes a call to the parent class which adds a request to get the created orders from the backend. The created
     * orders are all the orders which are unpaid. The return for that request then goes into this method which is similar 
     * to the "getWaiterUnconfirmed()" method.
     * 
     */

    async getUnpaidOrders() {
        this.props.addRequest("orders/list/created", null, async (data) => { // Add request
            data = data.orders;
            for (const order of data) {
                await request.getMenuItems(order.items) // Get menu items
                    // eslint-disable-next-line no-loop-func
                    .then(async (menuItems) => {
                        var menuItemsArray = [];
                        for (var i = 0; i < menuItems.length; i++) {
                            menuItemsArray.push(menuItems[i].result);
                        }

                        // Combine into 1 JSON blob
                        var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };
                        this.unpaidArray.push(combinedResult);
                    })


            }
            this.setState({
                unPaid: this.unpaidArray, // Set the state with the current array of unpaid orders
                showDimmer: false
            })
            this.unpaidArray = []; // Reset the unpaid orders

        })
    }

    /**
     * Similar to the "getUnpaidOrder" and "getWaiterUnconfirmed" this method adds to the request queue a request
     * to pull the correct to be delivered orders, then adds to the array and updates the state with the new information
     * 
     */

    async getKitchenCompleted() {
        this.props.addRequest("orders/list/kitchenComplete", null, async (data) => { // Makes request
            data = data.orders;
            for (const order of data) {
                await request.getMenuItems(order.items) // Gte details of each menu item
                    .then(async (menuItems) => {
                        var menuItemsArray = [];
                        for (var i = 0; i < menuItems.length; i++) {
                            menuItemsArray.push(menuItems[i].result);
                        }

                        var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };
                        this.toBeDeliveredArray.push(combinedResult);
                    })
            }
            this.setState({
                toBeDelivered: this.toBeDeliveredArray, // Add to the state, trigger a re-render
                showDimmer: false
            })
            this.toBeDeliveredArray = []; // Reset the array.

        })
    }

    /**
     * Confirm order takes an order ID and then pakes a HTTP POST request to the backend point to confirm that order.
     * 
     * This method applies to the orders which are in the waiterUnconfirmed endpoint. 
     * 
     * @param {order id to confirm} orderID 
     */

    confirmOrder(orderID) {

        this.props.addRequest("order/waiterConfirm", { order_id: orderID }, (json) => {
            console.log(json);
        })
    }

    /**
     * Deliver order takes an order id and then passes it to the backend HTTP POST endpoint to then go and 
     * deliver the order. 
     * 
     * This mainly applies to the "toBeDelivered" orders but the wrapper component handles that logic.
     * 
     * @param {order id to confirm delivery of order} orderID 
     */

    deliverOrder(orderID) {
        console.log("Deliver" + orderID);
        this.props.addRequest("order/waiterComplete", { order_id: orderID }, (res) => {
            console.log(res);
        })
    }

    /**
     * This method takes the order ID and passes it tot he backend to be cancelled. 
     * 
     * @param {an order ID to be cancelled} orderID 
     */

    cancelOrder(orderID) {
        this.props.addRequest("order/cancel", { order_id: orderID }, (json) => {
            console.log(json);
            console.log("Cancelling Order : " + orderID + json);
        })
    }


    render() {
        return (
            <div>
                <Dimmer active={this.state.showDimmer}> {/*If there is no data, show the dimmer to simulate loading*/}
                    <Icon loading name='spinner' size='huge' />
                </Dimmer>
                {/*Edit menu is displayed here which goes and shows 2 buttons and the logic for editing the menu*/}
                <EditMenu uID={this.props.uID} accessToken={this.props.accessToken}
                    updateToken={this.props.updateToken} addRequest={this.props.addRequest}></EditMenu>
                {/*Although not active, the notification component is added here. That deals with the rendering of each notificatoin*/}
                <Notifications tables={this.props.selectedTables} notifications={this.state.notifications}></Notifications>
                {/*Renders the waiter page wrapper passing in all the data as properties*/}
                <WaiterPageWrapper
                    unpaidOrders={this.state.unPaid}
                    cancelOrder={this.cancelOrder}
                    deliverOrder={this.deliverOrder}
                    toBeDelivered={this.state.toBeDelivered}
                    confirmOrder={this.confirmOrder}
                    unconfirmedOrders={this.state.unconfirmedOrders}>
                </WaiterPageWrapper>
            </div>
        )
    }
}
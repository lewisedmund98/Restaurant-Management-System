/**
 * The waiter page controller is the component which deals with polling the API requests.
 * There are several requests it needs to make. 
 * 
 * The first of which is the unconfirmed orders.
 * 
 * The next is the To be delivered
 * 
 * The next are the 24 hour waiting period
 * 
 * The data from these are passed to the WaiterPageWrapper which deals with mapping the data from
 * the requests to the View elements. 
 * 
 * Note: For now this will not have requests done, but I will mimic this statically in the card wrapper
 */

import React from 'react';
import WaiterPageWrapper from './WaiterPageWrapper.js';
import Notifications from './Notifications.js';
import EditMenu from './EditMenu.js';
var request = require('../Requests');

export default class WaiterPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unconfirmedOrders: [],
            toBeDelivered: [],
            twentyFourHours: [],
            notifications: [],
            accessToken: this.props.accessToken
        };
        this.arrayOfUnconfirmedOrders = []; // This is needed as updating the state each request is unfeesible
        this.toBeDeliveredArray = [];
        this.getUnconfirmedOrders = this.getUnconfirmedOrders.bind(this);
        this.getKitchenCompleted = this.getKitchenCompleted.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
    }
    
    componentDidMount() {
        this.startTimer(500);
    }

    startTimer(interval) {
        setTimeout(() => {
            this.checkForUpdate();
        }, interval);
    }

    async checkForUpdate() {
        if (this.props.accessToken) {
            this.getUnconfirmedOrders();
            // await this.getKitchenCompleted();
            //this.getNotifications();
        }
        this.startTimer(1000);
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async getNotifications() {
        for (var i = 0; i < this.props.selectedTables.length; i++) {
            // await fetch("https://flask.team-project.crablab.co/notifications/listTable", {
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     method: "POST",
            //     body: JSON.stringify({ table: this.props.selectedTables[i], id: this.props.uID, key: "abc123", secret: "def456", access_token: this.props.accessToken }), // pulls the order id from the order ID given
            // })
            //     .then(response => response.json())
            //     // eslint-disable-next-line no-loop-func
            //     .then((json) => {
            //         this.props.updateToken(json.new_access_token.access_token);
                this.props.addRequest("notifications/listTable", {table: this.props.selectedTables[i]}, (json) => {
                    var tempArray = this.state.notifications;
                    if (json.results.length > 0) { // If there is a new notification
                        json.results.forEach((notification) => { // Add it to the current list which will be passed
                            tempArray.push(notification);

                        })
                    }
                    this.setState({
                        notifications: tempArray
                    });
                })
        }
    }

    async getUnconfirmedOrders() {
        // await fetch("https://flask.team-project.crablab.co/orders/list/waiterUnconfirmed", {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     method: "POST",
        //     body: JSON.stringify({ id: this.props.uID, key: "abc123", secret: "def456", access_token: this.props.accessToken }), // pulls the order id from the order ID given
        // })
        //     .then(response => response.json())
        this.props.addRequest("orders/list/waiterUnconfirmed", null, (data) => {
                console.log("Running");
                data = data.orders;
                data.forEach(async (order, index) => {
                    await request.getMenuItems(order.items) // Pass Items
                        .then(async (menuItems) => {
                            var menuItemsArray = [];
                            for (var i = 0; i < menuItems.length; i++) {
                                menuItemsArray.push(menuItems[i].result);
                            }
                            await request.getCustomerDetailsFromOrder(order.orderID)
                                .then(customerDetails => {
                                    customerDetails = customerDetails.result[0];
                                    var combinedResult = { ...{ menuItems: menuItemsArray }, ...order, ...customerDetails};
                                    this.arrayOfUnconfirmedOrders[index] = combinedResult;
                                    if (!this.arrayOfUnconfirmedOrders.some(element => element.orderID === combinedResult.orderID)) {
                                        this.arrayOfUnconfirmedOrders.push(combinedResult);
                                    }

                                })

                        })
                })
                this.setState({
                    unconfirmedOrders: this.arrayOfUnconfirmedOrders
                })
                this.arrayOfUnconfirmedOrders = [];
            })
            
    }

    async getKitchenCompleted() {
        await fetch("https://flask.team-project.crablab.co/orders/list/kitchenComplete", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ id: this.props.uID, key: "abc123", secret: "def456", access_token: this.props.accessToken }), // pulls the order id from the order ID given
        })
            .then(response => response.json())
            .then(data => {
                this.props.updateToken(data.new_access_token.access_token);
                data = data.orders;
                data.forEach(async (order, index) => {
                    await request.getMenuItems(order.items) // Pass Items
                        .then((menuItems) => {
                            var menuItemsArray = [];
                            for (var i = 0; i < menuItems.length; i++) {
                                menuItemsArray.push(menuItems[i].result);
                            }
                            var combinedResult = { ...{menuItems: menuItemsArray}, ...order };
                            this.toBeDeliveredArray[index] = combinedResult;
                            if (!this.toBeDeliveredArray.some(element => element.orderID === combinedResult.orderID)) {
                                this.toBeDeliveredArray.push(combinedResult);
                            }

                        })
                })
                this.setState({
                    toBeDelivered: this.toBeDeliveredArray
                })
                this.toBeDeliveredArray = [];

            })
            .catch(error => {
                console.log(error);

            })

    }

    confirmOrder(orderID) {
        fetch("https://flask.team-project.crablab.co/order/waiterConfirm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: orderID })
        })
            .then(response => response.json())
            .then(json => console.log(json))
    }

    deliverOrder(orderID) {
        fetch("https://flask.team-project.crablab.co/order/waiterComplete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: orderID })
        })
            .then(response => response.json())
            .then(json => console.log(json))
    }

    cancelOrder(orderID) {
        fetch("https://flask.team-project.crablab.co/order/cancel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: orderID })
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                console.log("Cancelling Order : " + orderID + json);
            })
    }


    render() {
        return (
            <div>
                <EditMenu uID={this.props.uID} accessToken = {this.props.accessToken} updateToken={this.props.updateToken}></EditMenu>
                <Notifications tables={this.props.selectedTables} notifications={this.state.notifications}></Notifications>
                <WaiterPageWrapper
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
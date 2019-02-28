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
var request = require('../Requests');

export default class WaiterPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unconfirmedOrders: [],
            toBeDelivered: [],
            twentyFourHours: [],
            accessToken: this.props.accessToken
        };
        this.var = "Hello";
        this.arrayOfUnconfirmedOrders = []; // This is needed as updating the state each request is unfeesible
        this.toBeDeliveredArray = [];
        this.getUnconfirmedOrders = this.getUnconfirmedOrders.bind(this);
        this.getKitchenCompleted = this.getKitchenCompleted.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            async () => {
                try {
                    await this.checkForUpdate();
                } catch (error) {
                    console.log(error);
                }
            },
            4000
        );
    }

    async checkForUpdate() {
        if (this.props.accessToken) {
            await this.getUnconfirmedOrders();
            await this.sleep(1000);
            await this.getKitchenCompleted();
        }
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    async getUnconfirmedOrders(accessTokenE) {
        await fetch("https://flask.team-project.crablab.co/orders/list/waiterUnconfirmed", {
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
                            var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };

                            this.arrayOfUnconfirmedOrders[index] = combinedResult;
                            if (!this.arrayOfUnconfirmedOrders.some(element => element.orderID === combinedResult.orderID)) {
                                this.arrayOfUnconfirmedOrders.push(combinedResult);
                            }

                        })
                })
                this.setState({
                    unconfirmedOrders: this.arrayOfUnconfirmedOrders
                })
                this.arrayOfUnconfirmedOrders = [];
            })
            .catch(error => {
                console.log(error);

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
                            var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };

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

    deliverOrder(orderID){
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

    render() {
        return (
            <WaiterPageWrapper
                deliverOrder= {this.deliverOrder}
                toBeDelivered = {this.state.toBeDelivered}
                confirmOrder={this.confirmOrder}
                updateToken={this.props.updateToken}
                accessToken={this.props.accessToken}
                unconfirmedOrders={this.state.unconfirmedOrders}>
            </WaiterPageWrapper>

        )
    }
}
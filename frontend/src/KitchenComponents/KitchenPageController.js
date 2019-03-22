import React from 'react';
import KitchenPageWrapper from "./KitchenPageWrapper";
var request = require('../Requests');

export default class KitchenPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waiterConfirmed: [],
            toBeCompleted: [],
            accessToken: this.props.accessToken
        };
        this.waiterConfirmedArray = [];
        this.toBeCompletedArray = [];
        this.getWaiterConfirmed = this.getWaiterConfirmed.bind(this);
        this.kitchenConfirmOrder = this.kitchenConfirmOrder.bind(this);
        this.kitchenCompleteOrder = this.kitchenCompleteOrder.bind(this);
        this.checkForUpdate = this.checkForUpdate.bind(this);
        this.getKitchenConfirmed = this.getKitchenConfirmed.bind(this);
        this.requestLock = true; // Variable to tell whether a request has finished
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidMount() {
       this.startTimer(500);
    }

    startTimer(delay){
        setTimeout(() => {
            this.checkForUpdate();
         }, delay);
    }

    async checkForUpdate() {
        if (this.props.accessToken) {
            this.getWaiterConfirmed();
            this.getKitchenConfirmed();
        }
        this.startTimer(5000);
    }
   

    async getWaiterConfirmed() {
        // await fetch("https://flask.team-project.crablab.co/orders/list/waiterConfirmed", {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     method: "POST",
        //     body: JSON.stringify({ id: this.props.uID, key: "abc123", secret: "def456", access_token: this.props.accessToken }) // pulls the order id from the order ID given
        // })
        //     .then(response => response.json())
        //     .then(result => {
            this.props.addRequest("orders/list/waiterConfirmed", null, (result) => {
                result = result.orders;
                result.forEach(async (order, index) => {
                    await request.getMenuItems(order.items) // Pass Items
                        .then((menuItems) => {
                            var menuItemsArray = [];
                            for (var i = 0; i < menuItems.length; i++) {
                                menuItemsArray.push(menuItems[i].result);
                            }
                            var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };
                            this.waiterConfirmedArray[index] = combinedResult;
                            this.setState({
                                waiterConfirmed: this.waiterConfirmedArray
                            })
                        })
                })
                this.waiterConfirmedArray = [];
            })
    }

    async getKitchenConfirmed() {
        // await fetch("https://flask.team-project.crablab.co/orders/list/kitchenConfirmed", {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     method: "POST",
        //     body: JSON.stringify({ id: this.props.uID, key: "abc123", secret: "def456", access_token: this.props.accessToken }) // pulls the order id from the order ID given
        // })
        //     .then(response => response.json())
        //     .then(result => {
            this.props.addRequest("orders/list/kitchenConfirmed", null, (result) => {
                result = result.orders;
                result.forEach(async (order, index) => {
                    await request.getMenuItems(order.items) // Pass Items
                        .then((menuItems) => {
                            var menuItemsArray = [];
                            for (var i = 0; i < menuItems.length; i++) {
                                menuItemsArray.push(menuItems[i].result);
                            }
                            var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };
                            this.toBeCompletedArray[index] = combinedResult;
                            this.setState({
                                toBeCompleted: this.toBeCompletedArray
                            })
                        })
                })
                this.toBeCompletedArray = [];

            })
    
        }



    async kitchenConfirmOrder(orderID) {
        await fetch("https://flask.team-project.crablab.co/order/kitchenConfirm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: orderID })
        })
            .then(response => response.json())
            .then(json => console.log(json))
    }

    async kitchenCompleteOrder(orderID) {
        await fetch("https://flask.team-project.crablab.co/order/kitchenComplete", {
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
            <KitchenPageWrapper completeOrder={this.kitchenCompleteOrder} toBeCompleted={this.state.toBeCompleted} kitchenConfirmOrder={this.kitchenConfirmOrder} waiterConfirmed={this.state.waiterConfirmed}/>
        )
    }
}
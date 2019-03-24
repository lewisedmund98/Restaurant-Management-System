import React from 'react';
import KitchenPageWrapper from "./KitchenPageWrapper";
import {Dimmer, Icon} from 'semantic-ui-react';
var request = require('../Requests');

export default class KitchenPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.requestLock = true; // Variable to tell whether a request has finished
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidMount() {
        this.startTimer(500);
    }

    startTimer(delay) {
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
        this.props.addRequest("orders/list/waiterConfirmed", null, async (result) => {
            result = result.orders;
            for (const order of result) {
                await request.getMenuItems(order.items) // Pass Items
                    .then((menuItems) => {
                        var menuItemsArray = [];
                        for (var i = 0; i < menuItems.length; i++) {
                            menuItemsArray.push(menuItems[i].result);
                        }
                        var combinedResult = { ...{ menuItems: menuItemsArray }, ...order };
                        this.waiterConfirmedArray.push(combinedResult);
                    })
            }
            this.setState({
                waiterConfirmed: this.waiterConfirmedArray,
                showDimmer : false
            })
            this.waiterConfirmedArray = [];
        })
    }

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

    async kitchenConfirmOrder(orderID, eta) {
        var reqBody;
        if (eta !== null) {
            reqBody = { id: orderID, eta: eta };
        } else {
            reqBody = { id: orderID }
        }
        await fetch("https://flask.team-project.crablab.co/order/kitchenConfirm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
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
            <div>

                <Dimmer active={this.state.showDimmer}>
                    <Icon loading name='spinner' size='huge' />
                </Dimmer>
                <KitchenPageWrapper completeOrder={this.kitchenCompleteOrder} toBeCompleted={this.state.toBeCompleted} kitchenConfirmOrder={this.kitchenConfirmOrder} waiterConfirmed={this.state.waiterConfirmed} />
            </div>
        )
    }
}
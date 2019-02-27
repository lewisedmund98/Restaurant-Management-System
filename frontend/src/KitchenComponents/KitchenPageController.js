import React from 'react';
import KitchenPageWrapper from "./KitchenPageWrapper";
var request = require('../Requests');

export default class KitchenPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waiterConfirmed: [],
            toBeDelivered: [],
            twentyFourHours: [],
            accessToken: this.props.accessToken
        };
        this.waiterConfirmedArray = [];
        this.getWaiterConfirmed = this.getWaiterConfirmed.bind(this);
        this.kitchenConfirmOrder = this.kitchenConfirmOrder.bind(this);
        this.checkForUpdate = this.checkForUpdate.bind(this);
        this.req = true;
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
            2500
        );
    }

    async checkForUpdate() {
        if (this.props.accessToken) {
            await this.getWaiterConfirmed();
        }
    }


    async getWaiterConfirmed() {
        await fetch("https://flask.team-project.crablab.co/orders/list/waiterConfirmed", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ id: this.props.uID, key: "abc123", secret: "def456", access_token: this.props.accessToken }) // pulls the order id from the order ID given
        })
            .then(response => response.json())
            .then(result => {
                this.props.updateToken(result.new_access_token.access_token);
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
                            if (!this.waiterConfirmedArray.some(element => element.orderID === combinedResult.orderID)) {
                                this.waiterConfirmedArray.push(combinedResult);
                            }
                        })
                })
                this.setState({
                    waiterConfirmed: this.waiterConfirmedArray
                })
                this.waiterConfirmedArray = [];

            })
            .catch(error => {
                console.log(error);

            })
    }

    async kitchenConfirmOrder(orderID) {
        await fetch("https://flask.team-project.crablab.co/order/waiterConfirm", {
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
            <KitchenPageWrapper kitchenConfirmOrder={this.kitchenConfirmOrder} waiterConfirmed={this.state.waiterConfirmed} />
        )
    }
}
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
        this.waiterUnconfirmedArray = [];
        this.getWaiterConfirmed = this.getWaiterConfirmed.bind(this);
        this.checkForUpdate = this.checkForUpdate.bind(this);
        this.req = true;
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                try {
                    this.checkForUpdate();
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
            body: JSON.stringify({ id: "asdasd123123", key: "abc123", secret: "def456", access_token: this.props.accessToken }) // pulls the order id from the order ID given
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
                            this.waiterUnconfirmedArray[index] = combinedResult;
                            if (!this.waiterUnconfirmedArray.some(element => element.orderID === combinedResult.orderID)) {
                                this.waiterUnconfirmedArray.push(combinedResult);
                            }
                        })
                })
                this.setState({
                    waiterConfirmed: this.waiterUnconfirmedArray
                })
                this.waiterUnconfirmedArray = [];

            })


    }

    render() {
        console.log(this.state.waiterConfirmed);
        return (
            <KitchenPageWrapper waiterUnconfirmed={this.state.waiterConfirmed}/>
        )
    }
}
/**
 * Controller class added for customer orders which will be the class which renders everything for
 * the customer order page.
 */
import React from 'react';
import { OrderDisplay } from '../OrderComponents/OrderDisplay.js';


export default class OrderController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetails: "You do not currently have any orders...",
            orderStatus: null,
        }
        this.pullOrderDetails = this.pullOrderDetails.bind(this);
        this.pullOrderDetails();
    }

    pullOrderDetails() {
        //console.log(this.props.customerOrders);
        if (this.props.customerOrders.orderNumber) { // Sugar for not null / undefined, empty etc
            fetch("https://flask.team-project.crablab.co/order/view", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ "id": this.props.customerOrders.orderNumber }),
            })
                .then(response => response.json())
                .then(orderDetailsFromResponse => {
                    this.setState({
                        orderDetails: orderDetailsFromResponse
                    })
                });
        }
    }

    render() {
        return (
            <p>The customer order page controller {JSON.stringify(this.state.orderDetails)} </p>
        )
    }
}
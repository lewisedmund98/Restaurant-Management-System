/**
 * Controller class added for customer orders which will be the class which renders everything for
 * the customer order page.
 */
import React from 'react';
import  OrderDisplay  from '../OrderComponents/OrderDisplay.js';


export default class OrderController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetails: [],
            orderStatus: "You dont have any orders!",
        }
        this.pullOrderDetails = this.pullOrderDetails.bind(this);
        this.pullOrderDetails();
    }

    pullOrderDetails() { // Takes the order details and stores each into an array
        //console.log(this.props.customerOrders);
        var ordersArray = this.props.customerOrders.orderNumber; // Set the array to a variable
        if (ordersArray.length) { // Sugar for not null / undefined, empty etc
            Object.values(ordersArray).forEach(orderID => { // Loop through array of orderID's
                fetch("https://flask.team-project.crablab.co/order/view", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ "id": orderID.orderID}), // pulls the order id from the order ID given
                })
                    .then(response => response.json())
                    .then(orderDetailsFromResponse => {
                        var tempArray = this.state.orderDetails;
                        tempArray.push(orderDetailsFromResponse);
                        this.setState({
                            orderDetails: tempArray,
                            orderStatus : "Here are your orders"
                        })
                    });
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <p>The customer order page controller {JSON.stringify(this.state.orderStatus)} </p>
                <OrderDisplay orderDetails={this.state.orderDetails}></OrderDisplay>
            </React.Fragment>
            

        )
    }
}
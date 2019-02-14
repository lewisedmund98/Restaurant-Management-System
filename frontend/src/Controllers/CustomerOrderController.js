/**
 * Controller class added for customer orders which will be the class which renders everything for
 * the customer order page.
 */
import React from 'react';
import OrderDisplay from '../OrderComponents/OrderDisplay.js';


export default class OrderController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetails: [],
            menuItems: [],
            orderStatus: "You dont have any orders!",
        }
        this.pullOrderDetails = this.pullOrderDetails.bind(this);
        this.getMenuItems = this.getMenuItems.bind(this);
        this.getOrderStatus = this.getOrderStatus.bind(this);
    }

     componentDidMount(){
         this.pullOrderDetails();
    }

    pullOrderDetails() { // Takes the order details and stores each into an array
        //console.log(this.props.customerOrders);
        var ordersArray = this.props.customerOrders.orderNumber; // Set the array to a variable
        if (ordersArray.length) { // Sugar for not null / undefined, empty etc
            Object.values(ordersArray).forEach( orderID => { // Loop through array of orderID's
                //this.orderIds.push(orderID.orderID);
                 fetch("https://flask.team-project.crablab.co/order/view", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ "id": orderID.orderID }), // pulls the order id from the order ID given
                })
                    .then(response => response.json())
                    .then(async orderDetailsFromResponse => {
                        var finalResponse = orderDetailsFromResponse.order;
                        //  We require the data from the first fetch call so await
                        console.log(finalResponse.items);
                        await this.getMenuItems(finalResponse.items); // Await for this to finish
                        await this.getOrderStatus(orderID.orderID); // Await for this to finish
                        var menuResponse = { menu: this.state.menuItems };
                        console.log(menuResponse);
                        var combinedResult = { ...finalResponse, ...menuResponse, ...this.state.orderStatus };
                        var tempArray = this.state.orderDetails;
                        //if(!tempArray.includes(combinedResult)){
                            tempArray.push(combinedResult);
                        //}
                        this.setState({ // Assign details state and then reset other fields
                            orderDetails: tempArray,
                            menuItems:[],
                            orderStatus: null
                        });
                    });
            });
        }
    }

    async getMenuItems(itemList) {
        for (var j = 0; j < itemList.length; j++) {
            await fetch("https://flask.team-project.crablab.co/menu/item", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ id: itemList[j] }), // pulls the order id from the order ID given
            })
                .then(response => response.json())
                .then(menuItems => {
                    var tempArray = this.state.menuItems;
                    tempArray.push(menuItems.result);
                    console.log("this is run");
                    this.setState({
                        menuItems: tempArray
                    })
                });
        }
    }

    async getOrderStatus(orderID) {
        await fetch("https://flask.team-project.crablab.co/order/status", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ id: orderID }), // pulls the order id from the order ID given
        })
            .then(response => response.json())
            .then(orderStatus => {
                this.setState({
                    orderStatus: orderStatus.order
                })
            });
    }


    render() {
        return (
            <OrderDisplay orderDetails={this.state.orderDetails}></OrderDisplay>
        )
    }
}
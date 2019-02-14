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

    componentDidMount() {
        var ordersArray = this.props.customerOrders.orderNumber; // Set the array to a variable
        if (ordersArray.length) { // Sugar for not null / undefined, empty etc
            Object.values(ordersArray).forEach(orderID => {
                console.log("I am running");
                this.pullDetails(orderID.orderID)
                    .then(orderReturn => {
                        this.getMenuItems(orderReturn.order.items)
                            .then((menuItems) => {
                                var menuItemsArray = [];
                                for (var i = 0; i < menuItems.length; i++) {
                                    menuItemsArray.push(menuItems[i].result);
                                }
                                this.getOrderStatus(orderID.orderID)
                                    .then(() => {
                                        var menuResponse = { menu: menuItemsArray };
                                        var combinedResult = { ...orderReturn.order, ...menuResponse, ... this.state.orderStatus };
                                        var tempArray = this.state.orderDetails;
                                        tempArray.push(combinedResult);
                                        console.log(combinedResult);
                                        this.setState({
                                            orderDetails: tempArray,
                                            menuItems: [],
                                            orderStatus: ""
                                        })
                                    })

                            })
                    })
            })
        }
    }



    pullDetails(orderID) {
        return fetch("https://flask.team-project.crablab.co/order/view", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ "id": orderID }), // pulls the order id from the order ID given
        }).then(response => response.json());
    }



    getMenuItems(itemList) {
        var promiseArr = [];
        for (var j = 0; j < itemList.length; j++) {

            promiseArr.push(fetch("https://flask.team-project.crablab.co/menu/item", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ id: itemList[j] }), // pulls the order id from the order ID given
            })
                .then(response => response.json())
            );
        }
        return Promise.all(promiseArr);


    }

    getOrderStatus(orderID) {
        return fetch("https://flask.team-project.crablab.co/order/status", {
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
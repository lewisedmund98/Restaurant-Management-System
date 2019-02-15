/**
 * Controller class added for customer orders which will be the class which renders everything for
 * the customer order page.
 */
import React from 'react';
import OrderDisplay from '../OrderComponents/OrderDisplay.js';
let requests = require('../Requests');


export default class OrderController extends React.Component {
    constructor(props) {
        super(props);
        this.pullOrderDetails = this.pullOrderDetails.bind(this);
        this.state = {
            combinedResults : []
        }
        this.pullOrderDetails();
    }


    pullOrderDetails() {
        Object.values(this.props.customerOrders.orderNumber).forEach((orderID) => {
            requests.pullDetails(orderID.orderID) // Pass order ID's
                .then(orderReturn => {
                    requests.getMenuItems(orderReturn.order.items) // Pass Items
                        .then((menuItems) => {
                            var menuItemsArray = [];
                            for (var i = 0; i < menuItems.length; i++) {
                                menuItemsArray.push(menuItems[i].result);
                            }
                            requests.getOrderStatus(orderID.orderID)
                                .then((orderStatus) => {
                                    var menuResponse = { menu: menuItemsArray };
                                    var combinedResult = { ...orderReturn.order, ...menuResponse, ...orderStatus.order };
                                    var tempResultArr = this.state.combinedResults;
                                    tempResultArr.push(combinedResult);
                                    this.setState({
                                        combinedResult: tempResultArr
                                    })
                                })

                        })
                })
                .catch(error =>{
                    console.log("An error has occured " + error);
                })
        }
        )
    }



    render() {
        return (
            <OrderDisplay orderDetails={this.state.combinedResult}></OrderDisplay>
        )
    }

}
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
        this.startTimer = this.startTimer.bind(this);
        this.pollEndpoint = this.pollEndpoint.bind(this);
        this.state = {
            combinedResults: []
        }
        this.pullOrderDetails();
        this.arrayOfOrderDetails = [];
    }

    componentDidMount() {
        this.startTimer(500);
    }

    startTimer(interval) {
        setTimeout(() => {
            this.pollEndpoint();
        }, interval);
    }

    async pollEndpoint() {
        this.pullOrderDetails();
        this.startTimer(2500);
    }

    async pullOrderDetails() {
        var tempArr = document.cookie.replace(/(?:(?:^|.*;\s*)orders\s*\=\s*([^;]*).*$)|^.*$/, "$1").split(",");
        var noOrders = false;
        console.log("Test \\/")
        console.log(tempArr);
        console.log(tempArr.length);

        if (tempArr.length !== 0 && tempArr[0] !== "") {
            for (const index of tempArr) {
                await requests.pullDetails(index) // Pass order ID's
                    .then(async (orderReturn) => {
                        await requests.getMenuItems(orderReturn.order.items) // Pass Items
                            .then(async (menuItems) => {
                                var menuItemsArray = [];
                                for (var i = 0; i < menuItems.length; i++) {
                                    menuItemsArray.push(menuItems[i].result);
                                }
                                await requests.getOrderStatus(index)
                                    .then((orderStatus) => {
                                        var menuResponse = {menu: menuItemsArray};
                                        var combinedResult = {...orderReturn.order, ...menuResponse, ...orderStatus.order};
                                        //var tempResultArr = this.state.combinedResults;
                                        //tempResultArr.push(combinedResult);

                                        this.arrayOfOrderDetails[index] = combinedResult;
                                        if (!this.arrayOfOrderDetails.some(element => element.orderID === combinedResult.orderID)) {
                                            this.arrayOfOrderDetails.push(combinedResult);
                                        }
                                    })

                            })
                    })

            }
        } else {
            this.noOrders = true;
        }
        // Object.values(this.props.customerOrders.orderNumber).forEach((orderID, index) => {
        // });
        this.setState({
            combinedResult: this.arrayOfOrderDetails
        });
        this.arrayOfOrderDetails = [];
    }

    render() {
        return (
            <div>
                <OrderDisplay orderDetails={this.state.combinedResult}/>
                {this.noOrders && <h2 style={{ textAlign: "center" }}>No orders</h2>}
            </div>
        )
    }

}
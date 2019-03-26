/**
 *Customer order page is the page which shows the customer their orders. This calls the cuistomer
 order contoroller which deals with the requests. 

 Contains the templates for the customer pages and the general design for the webpage
 */

import React from 'react';
import OrderController from '../Controllers/CustomerOrderController'


export default class CustomerOrderPage extends React.Component {
    render() {
        var orderDetails = this.props.location.state; // passed state from customer pages (order id's etc)
        document.title = "Your Orders"; 
        return (
            <div className="orderContainer">
                <div class="topnav">
                    <img class="logo" src="oaxaca_logo.png" alt="Oaxaca Logo" height="150" width="150"/>
                </div>
                {/*Render order controller*/}
                <OrderController customerOrders={orderDetails}></OrderController>
            </div>  
        )
    }
}



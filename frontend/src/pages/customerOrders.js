/**
 *This is the staff page and requires some of the refactoring and some authentication 
 */

import React from 'react';
import OrderController from '../Controllers/CustomerOrderController'




export default class CustomerOrderPage extends React.Component {
    render() {
        var orderDetails = this.props.location.state;
        console.log(orderDetails);
        
        document.title = "Your Orders";
        return (
            <div className="orderContainer">
                <div class="topnav">
                    <img class="logo" src="oaxaca_logo.png" alt="Oaxaca Logo" height="150" width="150"/>
                </div>
                <OrderController customerOrders={orderDetails}></OrderController>
            </div>  
        )
    }
}



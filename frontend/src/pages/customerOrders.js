/**
 *This is the staff page and requires some of the refactoring and some authentication 
 */

import React from 'react';
import OrderController from '../Controllers/CustomerOrderController'
import '../index.css';



export default class CustomerOrderPage extends React.Component {
    constructor(props){
        super(props);
        // Because we used a <Link> We need to call the state passed like this:
        this.orderDetails = this.props.location.state;
    }
    render() {
        document.title = "Your Orders";
        return (
            <div className="orderContainer">
                <OrderController customerOrders={this.orderDetails}></OrderController>
            </div>  
        )
    }
}



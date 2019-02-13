/**
 *This is the staff page and requires some of the refactoring and some authentication 
 */

import React from 'react';

import '../index.css';



export default class CustomerOrderPage extends React.Component {
    constructor(props){
        super(props);
        // Because we used a <Link> We need to call the state passed like this:
        this.orderDetails = this.props.location.state;
    }
    render() {
        var order = this.props.state;
        console.log(this.props.location.state.or);
        document.title = "Your Orders";
        return (
            <div className="orderContainer">
                <h1>THIS IS YOUR ORDERS PAGE {this.orderDetails.orderNumber}</h1>
            </div>  
        )
    }
}



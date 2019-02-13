/**
 * Class to be used to represent an order for a customer.
 * This will take some order state in too.
 */
import React from 'react';

export default class OrderDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.mapOrderDetails = this.mapOrderDetails.bind(this);

    }

    mapOrderDetails(details) {
        var mappedDetails = details.map(element => 
           <li>{JSON.stringify(element)}</li>
        )
        return mappedDetails;

    }

    render() {
        var orders = this.mapOrderDetails(this.props.orderDetails);
        return (
            <ul>{orders}</ul>
        )
    }
}
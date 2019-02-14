/**
 * The wrapper is used to map each element of an order to either the OrderDisplay or the StaffOrderDisplay.
 * 
 * It takes in the Order details in JSON and passes it on but splits the top level array. 
 */

import React from 'react';
import {Table, Button} from 'semantic-ui-react';

export default class OrderDisplayWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.mapOrderList = this.mapOrderList.bind(this);
    }

    mapOrderList(orders) {
        var mappedList = orders.map((order, key) => {
            var moment = require('moment');
            console.log(order.timeCreated);
            var time = moment.unix(order.timeCreated).format("DD MMM YYYY hh:mm a");
            return (
                <Table.Row key={key}>
                    <Table.Cell>{order.customerID}</Table.Cell>
                    <Table.Cell>{order.orderID}</Table.Cell>
                    <Table.Cell>{time}</Table.Cell>
                    <Table.Cell>Not yet</Table.Cell>
                    <Table.Cell>Not yet</Table.Cell>
                    <Table.Cell><Button>Confirm Order</Button></Table.Cell>
                </Table.Row>
            )
        }
        )

        return mappedList;
    }
    render() {
        var mappedStaffOrders = this.mapOrderList(this.props.orderList);
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Customer Name</Table.HeaderCell>
                        <Table.HeaderCell>Customer Order Number</Table.HeaderCell>
                        <Table.HeaderCell>Order Time</Table.HeaderCell>
                        <Table.HeaderCell>Order Details</Table.HeaderCell>
                        <Table.HeaderCell>Order Status</Table.HeaderCell>
                        <Table.HeaderCell>Confirm Order</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {mappedStaffOrders}
                </Table.Body>
            </Table>
        )
    }
}
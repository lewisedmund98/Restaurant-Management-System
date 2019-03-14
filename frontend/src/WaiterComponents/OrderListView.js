/**
 * The order list view is for the waiter page. It shows the orders in a neat table with
 * the information loaded into it. 
 * 
 * This will take a boolean as a prop, the boolean represents whether or not the order
 * is unconfirmed or to be delivered. In the case of an unconfirmed order the program will
 * display the confirm button with the action for the confirm being an API call to confirm.
 * 
 * The second of which is representing the to be delivered in which case a button to set the state to "delivered"
 * these will both send different api POST calls to the backend where they handle the removal. All We need to do
 * is display
 */

import React from 'react';
import { Table, List, Button } from 'semantic-ui-react';
var requests = require('../Requests');

export default class OrderListView extends React.Component {
    constructor(props) {
        super(props);
        this.getCorrectButton = this.getCorrectButton.bind(this);
        this.confirmOrderLoc = this.confirmOrderLoc.bind(this);
        this.deliverOrder = this.deliverOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    confirmOrderLoc() {
        this.props.confirmOrder(this.props.orderID);
    }

    deliverOrder() {
        this.props.deliver(this.props.orderID);
    }

    cancelOrder() {
        this.props.cancelOrder(this.props.orderID);
    }

    getCorrectButton() {
        var buttonState = "";
        if (this.props.unconfirmed) {
            buttonState = "Confirm";
            return (
                
                    <Button className="waiterConfirmBtn" content={buttonState} onClick={(event, data) => {
                        this.confirmOrderLoc();
                    }}></Button>
                
            )
        }

        if (this.props.delivered) {
            return (
                <Button className="waiterConfirmBtn" content={"Confirm Delivery"} onClick={(event, data) => {
                    this.deliverOrder();
                }}></Button>
            )
        }

    }

    render() {
        // In the render we will have the table logic using the props. Like menuCard.js
        var moment = require('moment');
        var time = moment.unix(this.props.timeCreated).format("DD MMM YYYY hh:mm a");
        return (
            <Table.Row key={"this.props.key"}>
                <Table.Cell>{this.props.table}</Table.Cell>
                <Table.Cell>{this.props.custName}</Table.Cell>
                <Table.Cell>{this.props.orderID}</Table.Cell>
                <Table.Cell>{time}</Table.Cell>
                <Table.Cell><List>{this.props.menuList}</List></Table.Cell>
                <Table.Cell>

                    {this.getCorrectButton()}
                    <Button className="waiterCancelBtn" onClick={() => { this.cancelOrder() }}>Cancel</Button>

                </Table.Cell>
            </Table.Row>
        )
    }

}

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
 * 
 * The entire order is passed in to this class as paraneters and it can be used for removal purposes. 
 */

import React from 'react';
import { Table, List, Button, Message, Transition} from 'semantic-ui-react';

export default class OrderListView extends React.Component {
    constructor(props) {
        super(props);
        this.getCorrectButton = this.getCorrectButton.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.deliverOrder = this.deliverOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    /**
     * Confirm order local to this class.
     * 
     * This method makes a call to the function "confirmOrder" passed to this component from parent and passed it the orderID
     * Based on the boolean value which determines the type of the button to display.
     */

    confirmOrder() {
        this.props.confirmOrder(this.props.orderID);
    }

    /**
     * deliverOrder is the method to be called when the order needs to be delivered, passes the orderID to parent method. 
     * Note: This method is only called by a button which is determined on the boolean value depending on what type of view it is
     */

    deliverOrder() {
        this.props.deliver(this.props.orderID);
    }

    /**
     * Method to make a cancel request to the parent method. Passes that method the orderID as argument. 
     * This is universal to all types of orders to be viewed by the waiter. 
     * 
     */

    cancelOrder() {
        this.props.cancelOrder(this.props.orderID);
    }

    /**
     * Method to determine which button to render. It checks if "unconfirmed" or "delivered" is true and uses JSX
     * to return the correct button type to be rendered. Used in conjunction with render method.
     * 
     * This is to determined the specialised behavior of the components.
     * 
     */

    getCorrectButton() {
        if (this.props.unconfirmed) {
            return (
                    <Button className="waiterConfirmBtn" content={"Confirm"} onClick={() => {
                        this.confirmOrder(); // Implicit function to handle button click
                    }}></Button>
            )
        }

        if (this.props.delivered) {
            return (
                <Button className="waiterConfirmBtn" content={"Confirm Delivery"} onClick={(event, data) => {
                    this.deliverOrder(); // Handle on click of this button
                }}></Button>
            )
        }

    }

    getCorrectNotif() {
        if (this.props.unconfirmed) {
            return (
                <Transition animation="pulse" duration={Infinity}>
                <Message className="deliveryNotifs" color="red">
                    <Message.Header>Order Unconfirmed</Message.Header>
                </Message>
                </Transition>
            )
        }

        if (this.props.delivered) {
            return (
                <Message>
                    <Message.Header>Order Ready For Delivery</Message.Header>
                </Message>
            )
        }
    }

    render() {
        var moment = require('moment'); // Moment is a time library
        var time = moment.unix(this.props.timeCreated).format("DD MMM YYYY hh:mm a"); // Convert unix time to readable time
        return (
            <Table.Row key={"this.props.key"}>
                <Table.Cell>
                    {this.getCorrectNotif()}
                </Table.Cell>
                <Table.Cell>{this.props.table}</Table.Cell>
                <Table.Cell>{this.props.custName}</Table.Cell>
                <Table.Cell>{this.props.orderID}</Table.Cell>
                <Table.Cell>{time}</Table.Cell>
                <Table.Cell><List>{this.props.menuList}</List></Table.Cell>
                <Table.Cell>

                    {this.getCorrectButton()} {/*Makes a call to the button to render the right one */}
                    <Button className="waiterCancelBtn" onClick={() => { this.cancelOrder() }}>Cancel</Button>
                    {/**Cancel an order button which is always rendered and always passes the current value. */}

                </Table.Cell>
            </Table.Row>
        )
    }

}

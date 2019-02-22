/**
 * The waiter page wrapper takes the 3 data points from the controller and then it renders
 * the view components. The view components are going to be made and then there will
 * be 3 calls to 3 different views. 
 */

import React from 'react';
import OrderListView from './OrderListView';
import { Table } from 'semantic-ui-react';
export default class WaiterPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.mapToUnconfirmedOrders = this.mapToUnconfirmedOrders.bind(this);
    }

    mapToUnconfirmedOrders(unconfimedOrders) {
        // Map the unconfirmed orders
        var mappedUnconfirmed = [];
        return mappedUnconfirmed;
    }

    mapMenuItemsToList(menuItems) {
        var menuItemsMap = [];
        return menuItemsMap;
    }


    render() {
        return (
            <React.Fragment>
                <div style={{padding: "20px"}} className="unconfirmedOrderDiv">
                <h1>New Orders</h1>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer ID</Table.HeaderCell>
                            <Table.HeaderCell>Customer Name</Table.HeaderCell>
                            <Table.HeaderCell>Order ID</Table.HeaderCell>
                            <Table.HeaderCell>Order Time</Table.HeaderCell>
                            <Table.HeaderCell>Order Items</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <OrderListView unconfirmed={true}></OrderListView>
                    </Table.Body>
                </Table>
                </div>

                <div  style={{padding: "20px"}} className="toBeDeliveredDiv">
                    <h1>To Be Delivered</h1>
                    <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer ID</Table.HeaderCell>
                            <Table.HeaderCell>Customer Name</Table.HeaderCell>
                            <Table.HeaderCell>Order ID</Table.HeaderCell>
                            <Table.HeaderCell>Order Time</Table.HeaderCell>
                            <Table.HeaderCell>Order Items</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <OrderListView delivered={true}></OrderListView>
                    </Table.Body>
                    </Table>
                </div>

                <div className="24hourdiv">
                    <h1>24 hours orders</h1>
                </div>
            </React.Fragment>
        )
    }
}
/**
 * The waiter page wrapper is the class which takes the data from the fetch calls in the waiter page controller and then
 * maps them to be rendered by the order list view component. 
 * 
 * OrderPageController --> Data --> OrderPageWrapper --> Maps --> OrderListView
 * 
 * This handles the rendered of 3 data points: 
 * 
 * 1) waiterUnconfirmed orders which are paid orders which the waiter needs to confirm
 * 2) waiterToBeDelivered orders which have gone through the entire kitchen process and now can be delivered to a customer
 * 3) The unpaid orders wihch are orders placed by customers but have not been paid for. 
 * 
 * It uses generic map methods which take an array of one of these 3 datapoints and turns it into a corresponding
 * view. It then renders a table and a list of each of these. 
 */

import React from 'react';
import OrderListView from './OrderListView';
import { Table, Image } from 'semantic-ui-react';

export default class WaiterPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.mapToUnconfirmedOrders = this.mapToUnconfirmedOrders.bind(this);
        this.mapMenuItemsToList = this.mapMenuItemsToList.bind(this);
        this.mapUnpaid = this.mapUnpaid.bind(this);
    }

    /**
     * This takes a list of unconfirmed orders and then it maps those to orderlist view components
     * The main thing about this class is that it passes "unconfirmed = true" which tells the order list view to make sure
     * to display a confirm button rather than another. 
     * 
     * @param {List of unconfirmedOrders} unconfirmedOrders 
     */

    mapToUnconfirmedOrders(unconfirmedOrders) {
        // Map the unconfirmed orders
        var mappedUnconfirmed = []; // Empty array for new mapped orders to be mapped into
        mappedUnconfirmed = unconfirmedOrders.map((order, key) => {
            var mappedMenu = this.mapMenuItemsToList(order.menuItems); // Makes a call to map each menu item to a list
            return ( // JSX return for the new component with a order view. 
                <OrderListView table={order.table} cancelOrder={this.props.cancelOrder} confirmOrder={this.props.confirmOrder} custID={order.customerID} custName={order.name} orderID={order.orderID}
                    timeCreated={order.timeCreated} menuList={mappedMenu} unconfirmed={true}
                />
            )
        })
        return mappedUnconfirmed;
    }

    /**
     * Taking a list of to be delivered orders, this takes that list and maps it to the corresponding order list view. 
     * 
     * This method passes the order list view "delivered = true" which means it should then display "Deliver or Confirm Delivery"
     * @param {toBeDelivered order list} toBeDelivered 
     */

    mapToBeDeliveredOrders(toBeDelivered) {
        // Map the unconfirmed orders
        var mappedToBeDelivered = [];
        mappedToBeDelivered = toBeDelivered.map((order, key) => {
            var mappedMenu = this.mapMenuItemsToList(order.menuItems); // Call to map the menu items
            return (
                <OrderListView table={order.table} cancelOrder={this.props.cancelOrder} deliver={this.props.deliverOrder} custID={order.customerID} custName={order.name} orderID={order.orderID}
                    timeCreated={order.timeCreated} menuList={mappedMenu} delivered={true}
                />
            )
        })
        return mappedToBeDelivered;
    }

    /**
     * This method takes the unpaid orders from the properties and then takes it to be mapped into the correct order list view.
     * Because this method doesn't make the same truth value go to the order list view, which means it doesn't actually 
     * display any of the buttons so it only displays the cancel button
     * 
     * @param {unpaidOrders need to be mapped} unpaidOrders 
     */

    mapUnpaid(unpaidOrders) {
        // Map the unconfirmed orders
        var mappedUnpaid = [];
        mappedUnpaid = unpaidOrders.map((order, key) => {
            var mappedMenu = this.mapMenuItemsToList(order.menuItems); // Maps the menu items to an array.
            return (
                <OrderListView table={order.table} cancelOrder={this.props.cancelOrder} deliver={this.props.deliverOrder} custID={order.customerID} custName={order.name} orderID={order.orderID}
                    timeCreated={order.timeCreated} menuList={mappedMenu} unpaid={true}
                />
            )
        })
        return mappedUnpaid;
    }

    /**
     * Because the orders don't actually pass the mapped menu items, they also need their own
     * list of menu item components to be mapped into. This takes the list of menu items per order and then returns
     * another list of menu items to be displayed. This also means you can change how each menu item is 
     * displayed on the waiter page.
     * 
     * @param {menuItems list to be mapped into individual components} menuItems 
     */
    mapMenuItemsToList(menuItems) {
        var menuItemsMap = [];
        menuItemsMap = menuItems.map((item) => {
            return (<li>{item.itemName} <Image avatar src={item.itemImage} /></li>) // Uses JSX to return each element into the list
        })
        return menuItemsMap;
    }


    render() {
        // Check each of the arrays to make sure they are not empty otherwise react tries to render the components
        // and then throws an error. These arrays get filled once the ASYNC requests fulfill their promises.

        if (this.props.unconfirmedOrders !== undefined && this.props.unconfirmedOrders) {
            var mappedOrderList = this.mapToUnconfirmedOrders(this.props.unconfirmedOrders);
        }

        if (this.props.toBeDelivered !== undefined && this.props.toBeDelivered) {
            var mappedToBeDel = this.mapToBeDeliveredOrders(this.props.toBeDelivered);
        }

        if (this.props.unpaidOrders !== undefined && this.props.unpaidOrders) {
            var mappedUnpaid = this.mapUnpaid(this.props.unpaidOrders);
        }

        return ( // The render method basically returns 3 tables with set headers and a list of table elements from the maps. 
            <React.Fragment>
                <div style={{ padding: "20px" }} className="unconfirmedOrderDiv">
                    <h1>New Orders</h1>
                    <div style={{ height: "400px", overflowY: "scroll" }}>
                        <Table >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Table</Table.HeaderCell>
                                    <Table.HeaderCell>Customer Name</Table.HeaderCell>
                                    <Table.HeaderCell>Order ID</Table.HeaderCell>
                                    <Table.HeaderCell>Order Time</Table.HeaderCell>
                                    <Table.HeaderCell>Order Items</Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body> {/** Only the body of the table needs the mapped items */}
                                {mappedOrderList}
                            </Table.Body>
                        </Table>
                    </div>
                </div>

                <div style={{ padding: "20px" }} className="toBeDeliveredDiv">
                    <h1>To Be Delivered</h1>
                    <div style={{ height: "400px", overflowY: "scroll" }}>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Table</Table.HeaderCell>
                                    <Table.HeaderCell>Customer Name</Table.HeaderCell>
                                    <Table.HeaderCell>Order ID</Table.HeaderCell>
                                    <Table.HeaderCell>Order Time</Table.HeaderCell>
                                    <Table.HeaderCell>Order Items</Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body> {/**Adds the to be deleted mapped list to the table body*/}
                                {mappedToBeDel}
                            </Table.Body>
                        </Table>
                    </div>
                </div>

                <div style={{ padding: "20px" }} className="toBeDeliveredDiv">
                    <h1>Created and Unpaid</h1>
                    <div style={{ height: "400px", overflowY: "scroll" }}>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Table</Table.HeaderCell>
                                    <Table.HeaderCell>Customer Name</Table.HeaderCell>
                                    <Table.HeaderCell>Order ID</Table.HeaderCell>
                                    <Table.HeaderCell>Order Time</Table.HeaderCell>
                                    <Table.HeaderCell>Order Items</Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body> {/**Adds the unpaid mapped list to the table body*/}
                                {mappedUnpaid}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
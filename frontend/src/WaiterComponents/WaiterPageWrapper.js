/**
 * The waiter page wrapper takes the 3 data points from the controller and then it renders
 * the view components. The view components are going to be made and then there will
 * be 3 calls to 3 different views. 
 */

import React from 'react';
import OrderListView from './OrderListView';
import { Table, Image } from 'semantic-ui-react';

export default class WaiterPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            menuState : []
        }
        this.mapToUnconfirmedOrders = this.mapToUnconfirmedOrders.bind(this);
        this.mapMenuItemsToList = this.mapMenuItemsToList.bind(this);

    }

    mapToUnconfirmedOrders(unconfirmedOrders) {
        // Map the unconfirmed orders
        var mappedUnconfirmed = [];
        mappedUnconfirmed = unconfirmedOrders.map((order, key) => {
               
        })
        return mappedUnconfirmed;
    }

    mapMenuItemsToList(menuItems) {
        // /<OrderListView custID={order.customerID} custName={order.customerName} orderID={order.orderID}
       // timeCreated={order.timeCreated} menuList={mappedMenu} unconfirmed={true}
       // />
        var menuItemsMap = [];
        var itemRes = null;
        menuItemsMap = menuItems.map((item) => {
            itemRes = item.result; // Returns an array with each item being in a result
            return(<li>{itemRes.itemName} <Image src={itemRes.itemImage}/></li>)
        })
        return menuItemsMap;
    }


    render() {
        if(this.props.unconfirmedOrders != undefined && this.props.unconfirmedOrders){
            console.log(this.props.unconfirmedOrders);
            var mappedOrderList = this.mapToUnconfirmedOrders(this.props.unconfirmedOrders);
        }
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
                        {mappedOrderList} {/*<OrderListView unconfirmed={true}></OrderListView>*/}
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
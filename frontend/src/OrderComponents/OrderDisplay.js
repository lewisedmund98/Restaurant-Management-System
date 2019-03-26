/**
 * Class to be used to represent an order for a customer.
 * This will take some order state in too.
 * 
 * This class is to be used with the cookies too so that the customer doesn't have their order disappear.
 * 
 * There is logic in this class to deal with the payment component "Stripe"
 */
import React from 'react';
import { Card, List, Image } from 'semantic-ui-react';
import TakeMoney from '../OrderComponents/Stripe.js';
import OrderTimeline from '../OrderComponents/OrderTimeline.js'

export default class OrderDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.mapOrderDetails = this.mapOrderDetails.bind(this);
        this.mapMenuToLabels = this.mapMenuToLabels.bind(this);
    }

    /**
     * Takes the list of menu items and maps the list of menu items to a displayable list of 
     * components to be displayed to the user. 
     * 
     * @param {menu is the list of menu items which need to be shown to the user} menu 
     */

    mapMenuToLabels(menu) {
        var menuMap = menu.map((menuItem, key) => { // Key can be used to determine the uniqueness of the prop
            return (
                <List>
                    <List.Item>
                        <Image avatar src={menuItem.itemImage} />
                        <List.Content>
                            <List.Header>{menuItem.itemName}</List.Header>

                        </List.Content>
                    </List.Item>
                </List>
            )
        });
        return menuMap;
    }

    /**
     * Takes the order details from the parent class as a property and works on a way
     * to display the order details in a nice card.
     * 
     * Also deals with wehter to show the payment button and also is called on every state update
     * as there is a time line too. 
     * 
     * @param {pulled order details JSON data to be mapped} details 
     */

    mapOrderDetails(details) {
        if (details) {
            var moment = require('moment');
            var time;
            var mappedDetails = details.map((orderDetail, key) => {
                time = moment.unix(orderDetail.timeCreated).format("hh:mm a"); // Convert unix time to normal time
                var menuMapped = this.mapMenuToLabels(orderDetail.menu); // Map the menu items to be shown here
                return (<Card key={key} style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "50%" }}>
                    <Card.Content>
                        <Card.Header>
                            Order Number: {orderDetail.orderID}
                        </Card.Header>
                        <Card.Description>
                            Order Time: {time}
                        </Card.Description>
                        <Card.Meta >
                            Table Number: {orderDetail.table}
                        </Card.Meta>
                        <OrderTimeline stage={orderDetail.stage} />
                    </Card.Content>
                    <Card.Content extra>
                    {/*Display the mapped menu items*/}
                        {menuMapped}
                    </Card.Content>
                    <Card.Description>
                        {/*Check the stage of the order, only paid button will show if it needs to be paid for*/}
                        {(orderDetail.stage === "created") &&
                            <TakeMoney orderID={orderDetail.orderID}></TakeMoney>
                        }
                    </Card.Description>
                </Card>
                )})}
        return mappedDetails;
    }

    render() {
        if(this.props.orderDetails){ // Checks if the array is empty
            var orders = this.mapOrderDetails(this.props.orderDetails);
        }
        return (
            <div style={{ width: "100%" }} className="ordersDiv">
                <h1 style={{ textAlign: "center" }}>Your orders</h1>
                <ul>{orders}</ul>
            </div>
        )
    }
}
/**
 * Class to be used to represent an order for a customer.
 * This will take some order state in too.
 * 
 * This class is to be used with the cookies too so that the customer doesn't have their order disappear.
 * 
 * There is logic in this class to deal with the payment component "Stripe"
 */
import React from 'react';
import { Card, List , Image, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import TakeMoney from '../OrderComponents/Stripe.js';
import OrderTimeline from '../OrderComponents/OrderTimeline.js';

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
            var eta;
            var mappedDetails = details.map((orderDetail, key) => {
                time = moment.unix(orderDetail.timeCreated).format("hh:mm a"); // Convert unix time to normal time
                var menuMapped = this.mapMenuToLabels(orderDetail.menu); // Map the menu items to be shown here
                return (<Card key={key} style={{ display: "block", marginLeft: "auto", marginRight: "auto",  width: "50%", padding: "4px"}}>
                    <Card.Content>
                        <div style={{width: "100%", fontWeight: "bold", fontSize: "1.3em", marginBottom: "10px"}}><div style={{width: "50%", float: "left"}}>{time}</div><div style={{width: "50%", float: "right", textAlign: "right"}}>Table: {orderDetail.table}</div></div>
                        <div className="timelineCustomerOrder">
                            <OrderTimeline stage={orderDetail.stage} />
                        </div>
                    </Card.Content>
                    <Card.Content>
                        {/* Check if there is an ETA, if there is then display it */}

                        {(JSON.parse(orderDetail.metafield)['eta'] != null) && 
                                (eta = moment.unix(JSON.parse(orderDetail.metafield)['eta']).format("hh:mm a")) &&
                                <h4 className="etaText">ETA: {eta}</h4>
                        }
                    </Card.Content>
                    <Card.Content extra>
                    {/*Display the mapped menu items*/}
                        <div style={{fontSize: "1.1em"}}>{menuMapped}</div>
                        
                    </Card.Content>
                    <Card.Description>
                        {/*Check the stage of the order, only paid button will show if it needs to be paid for*/}
                        {(orderDetail.stage === "created") &&
                            <TakeMoney orderID={orderDetail.orderID}></TakeMoney>
                        }
                    </Card.Description>
                    <Card.Description style={{padding: "4px", textAlign: "center"}}>
                        Order ID: {orderDetail.orderID}
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
            
            <div>
            <div style={{ width: "100%" }} className="ordersDiv">
                <h1 style={{ textAlign: "center" }}>Your orders</h1>
                <ul>{orders}</ul>
            </div>
            <div style={{textAlign: "center"}}>
            <Link to={{
                pathname: "/customer"
            }}><Button id='returnToMenuFromOrder'>Return to menu</Button></Link>
            </div></div>
            
        )
    }
}
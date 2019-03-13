/**
 * Class to be used to represent an order for a customer.
 * This will take some order state in too.
 */
import React from 'react';
import { Card, List , Image, Label} from 'semantic-ui-react';
import TakeMoney from '../OrderComponents/Stripe.js';

export default class OrderDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.mapOrderDetails = this.mapOrderDetails.bind(this);
        this.mapMenuToLabels = this.mapMenuToLabels.bind(this);
    }


    mapMenuToLabels(menu) {
        var menuMap = menu.map((menuItem, key) => {
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
        })
        return menuMap;
    }

    mapOrderDetails(details) {
        if(details){
            var mappedDetails = details.map((orderDetail, key) => {
                var menuMapped = this.mapMenuToLabels(orderDetail.menu);
                return (<Card key={key} style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "50%" }}>
                <Card.Content>
                    <Card.Header>
                        Order Number: {orderDetail.orderID}
                    </Card.Header>
                    <Card.Description>
                        Order Time: {orderDetail.timeCreated}
                    </Card.Description>
                    <Card.Meta >
                        Table Number: {orderDetail.table}
                    </Card.Meta>
                    <Label color="red">{orderDetail.stage}</Label>
                </Card.Content>
                <Card.Content extra>
                    {menuMapped}
                </Card.Content>
                <Card.Description>
                    { orderDetail.stage !== "paid" &&
                    <TakeMoney orderID={orderDetail.orderID}></TakeMoney>
                    }
                </Card.Description>
            </Card>
            )
        }
        )
        
    }
        return mappedDetails;
    }

    render() {
        console.log(this.props.orderDetails);
        var orders = this.mapOrderDetails(this.props.orderDetails);
        return (
            <div style={{ width: "100%" }} className="ordersDiv">
            <h1 style={{textAlign: "center"}}>Your orders</h1>
                <ul>{orders}</ul>
            </div>
        )
    }
}
/**
 * Class to be used to represent an order for a customer.
 * This will take some order state in too.
 */
import React from 'react';
import { Card, List , Image, Label, Breadcrumb} from 'semantic-ui-react';
import TakeMoney from '../OrderComponents/Stripe.js';

export default class OrderDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.mapOrderDetails = this.mapOrderDetails.bind(this);
        this.mapMenuToLabels = this.mapMenuToLabels.bind(this);
        this.state = {
            orderProgress : [{ key: 'created', content: 'created', active: true }]
        }
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

    orderStage(newStage) {
        const tempOrderArray = this.state.orderProgress;
        if (tempOrderArray[tempOrderArray.length - 1]) {
            tempOrderArray[tempOrderArray.length - 1].active = false;
        }
        const newElement = {key: newStage, content: newStage, active: true};
        tempOrderArray.push(newElement);
        this.setState({
            orderProgress: tempOrderArray
        });
    }

    mapOrderDetails(details) {
        if(details){
            var moment = require('moment');
            var time;
            var mappedDetails = details.map((orderDetail, key) => {
                for (const s of this.state.orderProgress) {
                    if (s.key === orderDetail.stage) {
                        break;
                    }
                    alert("gets to here");
                    this.orderStage(orderDetail.stage);
                }
                time = moment.unix(orderDetail.timeCreated).format("hh:mm a");
                var menuMapped = this.mapMenuToLabels(orderDetail.menu);
                var colour = "red";
                if(orderDetail.stage === "paid"){colour="green"}
                return (<Card key={key} style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "50%" }}>
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
                    <Label color={colour}>{orderDetail.stage}</Label>
                    <Breadcrumb icon='right arrow' sections={this.state.orderProgress} />
                </Card.Content>
                <Card.Content extra>
                    {menuMapped}
                </Card.Content>
                <Card.Description>
                    { (orderDetail.stage !== "paid" && orderDetail.stage !== "cancelled") &&
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
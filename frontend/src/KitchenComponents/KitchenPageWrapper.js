import React from 'react';
import KitchenItemsView from "./KitchenItemsView";
import {Card, Button} from 'semantic-ui-react';
import { timingSafeEqual } from 'crypto';

export default class KitchenPageWrapper extends React.Component {

    constructor(props){
        super(props);
        this.mappedWaiterConfirm = this.mappedWaiterConfirm.bind(this);
        this.mapKitchenItems = this.mapKitchenItems.bind(this);
        this.mapKitchenToBeCompleted = this.mapKitchenToBeCompleted.bind(this);
    }

    handleKitchenConfirm(orderID){
        this.props.kitchenConfirmOrder(orderID);
    }

    handleKitchenComplete(orderID){
        this.props.kitchenConfirmOrder(orderID);
    }

    mappedWaiterConfirm(waiterConfirmed){
        var mappedCards = waiterConfirmed.map((element) => {
            var mappedKitchenItems = this.mapKitchenItems(element.menuItems);
            return(
                <Card className="kitchenCard">
                <Card.Content>
                    <h5>{element.orderID}</h5>
                    {mappedKitchenItems}
                </Card.Content>
                <Card.Content extra>
                    <div id="kitchenOrderButtons">
                        <div id="kitchenTimeButtons">
                            <Button className="kitchenTimeButton">05</Button>
                            <Button className="kitchenTimeButton">10</Button>
                            <Button className="kitchenTimeButton">20</Button>
                            <Button className="kitchenTimeButton">30</Button>
                            <Button onClick={() => {this.handleKitchenConfirm(element.orderID)}}
                            id="kitchenConfirmButton">Confirm</Button>
                        </div>
                    </div>
                </Card.Content>
            </Card>
            )
        })

        return mappedCards;
    }

    mapKitchenItems(menuItems){
        var mappedItems = menuItems.map((item) => {
            return(
              <KitchenItemsView itemImage={item.itemImage} itemName={item.itemName}></KitchenItemsView>  
            )
        })
        return mappedItems;
    }

    mapKitchenToBeCompleted(toBeCompleted){
        var mappedCards = toBeCompleted.map((element) => {
            var mappedKitchenItems = this.mapKitchenItems(element.menuItems);
            return(
                <Card>
                <Card.Content>
                    <h5>{element.orderID}</h5>
                    {mappedKitchenItems}
                </Card.Content>
                <Card.Content extra>
                    <div id="kitchenOrderButtons">
                            <Button onClick={() => {this.handleKitchenComplete(element.orderID)}}
                            id="kitchenConfirmButton">Complete Order</Button>
                    
                    </div>
                </Card.Content>
            </Card>
            )
        })
        return mappedCards;
    }
    render() {
        if(this.props.waiterConfirmed){
            var mappedWaiter = this.mappedWaiterConfirm(this.props.waiterConfirmed);
        }

        if(this.props.toBeCompleted){
            var mappedToBeCompleted = this.mapKitchenToBeCompleted(this.props.toBeCompleted);
        }
        return (
            <React.Fragment>
                <h1>Waiter Confirmed</h1>
            <Card.Group>
                {mappedWaiter}
            </Card.Group>
                <h1>To be Completed</h1>
            <Card.Group>
                {mappedToBeCompleted}
            </Card.Group>
            </React.Fragment>
        )
    }
}
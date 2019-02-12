import React from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import BasketItem from './BasketItem';
import OrderForm from './OrderForm.js';

/**
 * The create order class is a modal which pops up to the user when they click on the "View Basket" button
 * It is where the user can see their basket and then place the final order and enter their details. 
 * 
 * This class will eventually contain the methods needed for payment taking.
 * 
 * In the modal it shows 2 divs styled to be next to each other. It shows the basket element
 * and it also shows the form from "OrderForm.js". 
 */
export default class CreateOrder extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Modal trigger={<Button>View Basket</Button>}>
                <Modal.Content>
                    <div style={{ float: "left", width: "30%"}} className="orderBasket">
                        <h1> Your Basket </h1>
                        <BasketItem onRemove={this.props.onRemove} currentBasket={this.props.currentBasket}></BasketItem>
                    </div>

                    <div style={{ float: "right", width:"70%" }} className="orderForm">
                        <OrderForm currentBasket={this.props.currentBasket}>

                        </OrderForm>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}
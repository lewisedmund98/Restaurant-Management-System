import React from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import BasketItem from './BasketItem';
import OrderForm from './OrderForm.js';

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
                        <BasketItem currentBasket={this.props.currentBasket}></BasketItem>
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
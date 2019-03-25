import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
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
        this.makeOrder = this.makeOrder.bind(this);    
    }

    /**
     * Taking the order body HTTP data it makes a request to the backend
     * to complete an order. This is based off the form which takes the user data.
     * 
     * @param {the order body to be sent to the backend} orderBody 
     */

    makeOrder(orderBody){
        try{
            fetch("https://flask.team-project.crablab.co/order/create", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:orderBody,
            }).then(response => response.json())
            .then(json => this.props.setOrder(json)); // Calls the parent class to set a new order in the order list
        } catch (error){
            console.log(error);
        }

    }
    

    render() {
        return (
            <Modal trigger={<Button className="viewBasket">View Basket</Button>}>
                <Modal.Content>
                    <div style={{ float: "left", width: "30%"}} className="orderBasket">
                        <h1 id="orderFormTitle"> Your Basket </h1>
                        {/*Show the basket*/}
                        <BasketItem onRemove={this.props.onRemove} currentBasket={this.props.currentBasket}></BasketItem>
                    </div>

                    <div style={{ float: "right", width:"70%" }} className="orderForm">
                    {/*Show the order form*/}
                        <OrderForm makeOrder={this.makeOrder} currentBasket={this.props.currentBasket}>

                        </OrderForm>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}
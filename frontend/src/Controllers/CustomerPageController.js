import React from 'react';
import CardContoller from './CardController.js';
import '../index.css';
import Basket from '../BasketComponents/Basket.js';

/**
 * The customer page controller is the main controller for the page with url/customer.
 * It renders in the main container for the customer page in which it shows the menu and and the basket. 
 * 
 * The card controller shows the Menu cards and the tabs which allow the navigation of the menu
 * 
 * The Basket is the basket which shows on the page and then you can view the basket to place an order.
 */

export default class CustomerPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBasket:[] // Adds a basket array to which I will append menu objects
        };
        this.addToBasket = this.addToBasket.bind(this); // Method to add to the basket. 
    }

    /**
     * 
     * @param {The menu item which is added. It is actually the JSON object pulled from the HTTP} addedMenuItem 
     */
    addToBasket(addedMenuItem) { 
            var tempBasket = this.state.currentBasket; // The reason for this is I cannot directly edit the state
            tempBasket.push(addedMenuItem); 
            this.setState({
                currentBasket: tempBasket // I re-assign the basket as I cannot array.push here
            })
    }

    render() {

        return (
            <div className="mainContainer">
                <div id="ListCards">
                    <CardContoller basket={this.addToBasket}> {/*Basket is the event handler for a button*/}
                    </CardContoller>
                </div>
                <div className="basketButton">
                    <Basket dishList={this.state.currentBasket}></Basket>
                </div>
            </div>
        )
    }
}
import React from 'react';
import CardController from './CardController.js';
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
        this.removeFromBasket = this.removeFromBasket.bind(this); 
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
    /**
     * This function takes a JSON object for a menu item to remove that item from the array of menu items.
     * 
     * @param {the menuItem to remove. This should be in JSON dish format} menuItem 
     */

    removeFromBasket(menuItem) {
        var tempBasket = this.state.currentBasket; // The reason for this is I cannot directly edit the state
        var itemSearchIndex = tempBasket.indexOf(menuItem); // Takes the index of the item to remove
        // Perform Swap with arrray elements
        var tempMenuItem = tempBasket[tempBasket.length - 1]; // Last element in temp
        tempBasket[tempBasket.length - 1] = menuItem; // Assigns the last element of the array the item to remove
        tempBasket[itemSearchIndex] = tempMenuItem; // Sets the previous end of array to the removed item position
        tempBasket.pop(); // Removes the unwanted item

        this.setState({
            currentBasket: tempBasket // I re-assign the basket as I cannot array.push here
        })
    }


    render() {
        return (
            <div className="mainContainer">
                <div id="ListCards">
                    <CardController basket={this.addToBasket}> {/*Basket is the event handler for a button*/}
                    </CardController>
                </div>
                <div className="basketButton">
                    <Basket onRemove={this.removeFromBasket} dishList={this.state.currentBasket}></Basket>
                </div>
            </div>
        )
    }
}
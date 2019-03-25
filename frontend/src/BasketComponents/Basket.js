import React from 'react';
import CreateOrder from './CreateOrder';
import BasketItem from './BasketItem';
/**
 * Class is used as the basket. This renders in the basket at the bottom of the screen and has a calculate total
 * which updates everytime the user adds something to the basket. 
 * 
 * It also recalculates the amount of items there are in the basket
 * 
 */
export default class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    /**
     * Calculate total is a method called on every state update.
     * It takes the current items in the basket and calculates the entire total of their item prices
     * 
     */

    calculateTotal() {
        let total = 0.0;
        try {
            Object.values(this.props.dishList).forEach(dish => { // Loops over each dish in the basket and gets its price
                total += Math.round(parseFloat(dish.itemPrice)); // Convert String to Int
            });
        } catch (error) {
            console.log(error);
        }
        return total; // Final Total
    }

    calculateNumberOfItems() {
        let numberOfItems = 0;
        try {
            Object.values(this.props.dishList).forEach(dish => {
                numberOfItems += 1;
            });
        } catch (error) {
            console.log(error);
        }
        return numberOfItems;
    }


    render() {
        var total = this.calculateTotal(); // On each update to state re calculate the total
        var numberOfItems = this.calculateNumberOfItems(); // On each update re calculate the number of items
        return (
            <div className="basketItems">

                <BasketItem onRemove={this.props.onRemove} currentBasket={this.props.dishList} />

                <h1> Total Price: £{total} </h1>
                <p> Number of Items: {numberOfItems}  </p>
                <CreateOrder setOrder={this.props.setOrder} onRemove={this.props.onRemove} currentBasket={this.props.dishList}></CreateOrder>
            </div>
        )
    }
}

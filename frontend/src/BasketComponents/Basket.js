import React from 'react';
import {Button, Modal} from 'semantic-ui-react';
import BasketItem from './BasketItem';
/**
 * Class is used as the basket. This renders in
 */
export default class Basket extends React.Component{
    constructor(props){
        super(props);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    calculateTotal(){
        var total = 0.0;
        try{
            Object.values(this.props.dishList).forEach(element => {
                total += Math.round(parseFloat(element.itemPrice));
            });
        } catch (error) {
            console.log(error);
        }
        return total;
    }
    render(){
        var total = this.calculateTotal();
        return(
            <div className="basketItems">
                <BasketItem currentBasket={this.props.dishList}></BasketItem>
                <h1> Total Price: £{total} </h1>
            </div>
        )
    }
}
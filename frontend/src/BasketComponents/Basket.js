import React from 'react';
import CreateOrder from './CreateOrder';
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
            Object.values(this.props.dishList).forEach(dish => {
                total += Math.round(parseFloat(dish.itemPrice));
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
                <BasketItem currentBasket={this.props.dishList}/>
                <h1> Total Price: £{total} </h1>
                <CreateOrder currentBasket={this.props.dishList}></CreateOrder>
            </div>
        )
    }
}
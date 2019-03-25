import React from 'react';
import CreateOrder from './CreateOrder';
import BasketItem from './BasketItem';
/**
 * Class is used as the basket. This renders in the basket at the bottom of the screen and has a calculate total
 * which updates everytime the user adds something to the basket. 
 * 
 */
export default class Basket extends React.Component{
    constructor(props){
        super(props);
        
        this.calculateTotal = this.calculateTotal.bind(this);
    
    }

    calculateTotal(){
        let total = 0.0;
        try{
            Object.values(this.props.dishList).forEach(dish => { // Loops over each dish in the basket and gets its price
                total += Math.round(parseFloat(dish.itemPrice));
            });
        } catch (error) {
            console.log(error);
        }
        return total;
    }
    calculateNumberOfItems(){
        let numberOfItems = 0;
        try{
            Object.values(this.props.dishList).forEach(dish => {
                numberOfItems += 1;
            });
        } catch (error){
            console.log(error);
        }
        return numberOfItems;
    }

    
    render(){
        var total = this.calculateTotal();
        var numberOfItems = this.calculateNumberOfItems();
                return(
            <div className="basketItems">
                
                <BasketItem onRemove={this.props.onRemove} currentBasket={this.props.dishList}/>
                
                <h1> Total Price: £{total} </h1>
                <p> Number of Items: {numberOfItems}  </p>
                <CreateOrder setOrder={this.props.setOrder} onRemove={this.props.onRemove} currentBasket={this.props.dishList}></CreateOrder>
            </div>
        )
    }
}

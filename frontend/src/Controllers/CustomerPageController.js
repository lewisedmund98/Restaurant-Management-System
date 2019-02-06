import React from 'react';
import CardContoller from './CardController.js';
import '../index.css';

export default class CustomerPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBasket:[] // Adds a basket array to which I will append menu objects
        };
        this.addToBasket = this.addToBasket.bind(this); // Method to add to the basket. 
    }

    addToBasket(addedMenuItem) {
         
        console.log("You clicked " + addedMenuItem);
    }

    render() {

        return (
            <div className="mainContainer">
                <div id="ListCards">
                    <CardContoller basket={this.addToBasket}>
                    </CardContoller>
                </div>
            </div>
        )
    }
}
/**
 * The order list view is for the waiter page. It shows the orders in a neat table with
 * the information loaded into it.
 *
 * This will take a boolean as a prop, the boolean represents whether or not the order
 * is unconfirmed or to be delivered. In the case of an unconfirmed order the program will
 * display the confirm button with the action for the confirm being an API call to confirm.
 *
 * The second of which is representing the to be delivered in which case a button to set the state to "delivered"
 * these will both send different api POST calls to the backend where they handle the removal. All We need to do
 * is display
 */

import React from 'react';
import {Table, List, Button} from 'semantic-ui-react';

export default class KitchenItemsView extends React.Component{
    constructor(props){
        super(props);
        this.getCorrectButton = this.getCorrectButton.bind(this);
    }

    getCorrectButton(){
        if(this.props.unconfirmed){
            return(
                <Button>Confirm</Button>
            )
        }

        if(this.props.delivered){
            return(
                <Button>Confirm Delivery</Button>
            )
        }

    }

    render(){
        // In the render we will have the table logic using the props. Like menuCard.js
        return(
            <p>hi</p>
        )
    }

}

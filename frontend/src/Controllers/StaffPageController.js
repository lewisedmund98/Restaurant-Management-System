import React from 'react';
import CardContoller from './CardController.js';
import '../index.css';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import OrderDisplay from '../OrderComponents/OrderDisplay.js';

/**
 * The staff page controller is the main controller for the page with url/staff.
 * It renders in the main container for the staff page in which it shows the list of orders and their current state. 
 * 
 */

export default class StaffPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    
    } 

render() {
    return (
        <OrderDisplay orderDetails={this.state.orderDetails}></OrderDisplay>
    )
}
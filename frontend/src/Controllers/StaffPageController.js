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
            orderList:[]
        };
    
    } 

    componentDidMount(){
        this.timerID = setInterval(
            () => this.checkForNewOrders(),
            2000
          );   
        }

        
    checkForNewOrders(){
        fetch("https://flask.team-project.crablab.co/orders/list")
        .then(response => response.json())
        .then(jsonReturn => {
            // Do stuff with Order
            jsonReturn = jsonReturn.orders;
            var jsonArray = []
            for(var i = 0; i<jsonReturn.length; i++){
                jsonArray[i] = jsonReturn[i];
            }

            this.setState({
                orderList : jsonArray
            });
        })
    }


render() {
    // The current orders are accesible through "orderList" in the state
    return (
        <h1>The staff page controller</h1>
    )
}
}
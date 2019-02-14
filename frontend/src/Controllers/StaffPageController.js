import React from 'react';
import CardContoller from './CardController.js';
import '../index.css';
import OrderDisplayWrapper from '../OrderComponents/OrderDisplayWrapper.js';

/**
 * The staff page controller is the main controller for the page with url/staff.
 * It renders in the main container for the staff page in which it shows the list of orders and their current state. 
 * 
 */

export default class StaffPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        };

    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.checkForNewOrders(),
            7500
        );
    }


    checkForNewOrders() {
        try {

            fetch("https://flask.team-project.crablab.co/orders/list")
                .then(response => response.json())
                .then(jsonReturn => {
                    // Do stuff with Order
                    jsonReturn = jsonReturn.orders;
                    var jsonArray = []
                    for (var i = 0; i < jsonReturn.length; i++) {
                        jsonArray[i] = jsonReturn[i];
                    }
                    this.setState({
                        orderList: jsonArray
                    });
                })
                .catch(() => {
                    console.log("An issue with the server");
                })
        } catch (error) {
            console.log("An issue occured");
        }
    }


    render() {
        // The current orders are accesible through "orderList" in the state
        return (
            <OrderDisplayWrapper orderList={this.state.orderList}></OrderDisplayWrapper>
        )
    }
}
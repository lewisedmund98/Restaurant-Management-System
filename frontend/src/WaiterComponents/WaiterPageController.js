/**
 * The waiter page controller is the component which deals with polling the API requests.
 * There are several requests it needs to make. 
 * 
 * The first of which is the unconfirmed orders.
 * 
 * The next is the To be delivered
 * 
 * The next are the 24 hour waiting period
 * 
 * The data from these are passed to the WaiterPageWrapper which deals with mapping the data from
 * the requests to the View elements. 
 * 
 * Note: For now this will not have requests done, but I will mimic this statically in the card wrapper
 */

 import React from 'react';
 import WaiterPageWrapper from './WaiterPageWrapper.js';
 var request = require('../Requests');

 export default class WaiterPageController extends React.Component{
     constructor(props){
         super(props);
         this.state={
             unconfirmedOrders: [],
             toBeDelivered: [],
             twentyFourHours: [],
             accessToken : this.props.accessToken
         };
         this.getUnconfirmedOrders = this.getUnconfirmedOrders.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                try{
                    this.checkForUpdate();
                } catch (error){
                    console.log(error);
                }
            },
            2000
        );
    }

    checkForUpdate(){
        if(this.props.accessToken){
            this.getUnconfirmedOrders(this.props.accessToken);
        }
    }

    
    getUnconfirmedOrders(accessTokenE){
        console.log(JSON.stringify({ key: "abc123", secret:"def456", accessToken: accessTokenE}));
        fetch("https://flask.team-project.crablab.co/orders/list/waiterUnconfirmed",{
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ id: "asdasd123123", key: "abc123", secret:"def456", access_token: accessTokenE}), // pulls the order id from the order ID given
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.updateToken(data.new_access_token.access_token);
            this.setState({
                unconfirmedOrders : data.orders
            })
        })
    }
    

     render(){
         
         return(
             <WaiterPageWrapper></WaiterPageWrapper>

         )
     }
 }
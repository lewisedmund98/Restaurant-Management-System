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

 export default class WaiterPageController extends React.Component{
     constructor(props){
         super(props);
         this.state={
             unconfirmedOrders: [],
             toBeDelivered: [],
             twentyFourHours: [],
             accessToken : this.props.accessToken
         };

     }
     render(){
         if(this.props.accessToken){console.log(this.props.accessToken);}
         return(
             <WaiterPageWrapper></WaiterPageWrapper>

         )
     }
 }
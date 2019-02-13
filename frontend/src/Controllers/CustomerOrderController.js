/**
 * Controller class added for customer orders which will be the class which renders everything for
 * the customer order page.
 */
import React from 'react';
import {OrderDisplay} from '../OrderComponents/OrderDisplay.js';


 export default class OrderController extends React.Component{
     constructor(props){
         super(props);
         this.state={
             orderDetails: this.props.customerOrders
         }

     }

     render(){
         return(
             <p>The customer order page controller {this.state.orderDetails.orderNumber} </p>
         )
     }
 }
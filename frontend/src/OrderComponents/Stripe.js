/**
 * Code here based off GitHub user: https://github.com/azmenak/react-stripe-checkout
 * 
 * Not the same code, but similaar and using his components. 
 */
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
  constructor(props){
    super(props);
    this.payForOrder = this.payForOrder.bind(this);
  }
    onToken(token){  
        token = {...token, ...{order_id: this.props.orderID}};
        var newToken = JSON.stringify(token);
        var newTokenIdReplaced = newToken.replace(/"id"/, "\"token_id\"");
        this.payForOrder(newTokenIdReplaced);
    }

    payForOrder(finalToken){
      // Makes fetch call

    }
  
    // ...
  
    render() {
      return (
        // ...
        <StripeCheckout
          token={(token)=>{this.onToken(token)}} // Replaced with non anon function, had to add orderid
          stripeKey="pk_test_Q4rJhvGHpIIBZsRPORvPQhPE"
        />
      )
    }
}
/**
 * Code here based off GitHub user: https://github.com/azmenak/react-stripe-checkout
 * 
 * Not the same code, but similaar and using his components. 
 */
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
    onToken(token){
        console.log(JSON.stringify(token));
    }
  
    // ...
  
    render() {
      return (
        // ...
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_IpuLRj54pedNNvXnmEnz1Rr3"
        />
      )
    }
}
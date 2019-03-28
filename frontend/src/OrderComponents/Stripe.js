/**
 * Code here based off GitHub user: https://github.com/azmenak/react-stripe-checkout
 * 
 * Not the same code, but similaar and using his components. 
 * 
 * Stripe class is class used for taking the payments using the stripe code and
 * the users stripe react checkout which deals with the rendering of the stripe payment box.
 * 
 * You can instantiate the class using <TakeOrder/> and this will show you the button. To pay
 * for an order you must pass the order ID as properties to this class
 * 
 */

import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
  constructor(props) {
    super(props);
    this.payForOrder = this.payForOrder.bind(this);
  }


  /**
   * Event based method, called when the button is clicked for the stripe payment.
   * 
   * This takes the token from the stripe payment API's and then it turns the ID into "token_id" for the
   * backend to use it a lot easier. 
   * 
   * It calls payForOrder which sends the request to the backend
   * 
   * @param {stripe payment token} token 
   */

  onToken(token) {
    token = { ...token, ...{ order_id: this.props.orderID, key:"abc123", secret:"def456" } }; // Adds the order id to the request body to be sent
    var newToken = JSON.stringify(token); // Turn into string to make it easier to handle
    var newTokenIdReplaced = newToken.replace(/"id"/, "\"token_id\""); // Regex for ID and replace it
    this.payForOrder(newTokenIdReplaced); // Pays for order
  }

  /**
   * Takes the final token and sends the data to the backend to show that "a payment has been takenb"
   * it also adds the requiest order id as the body which was formulated in onToken
   * @param {final token is the token with the changed name} finalToken 
   */

  payForOrder(finalToken) {
    // Makes fetch call
    fetch("https://flask.team-project.crablab.co/order/payment", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: finalToken
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
    })
  }

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        email={"Payment@Placeholder.com"}
        token={(token) => { this.onToken(token) }} // Replaced with non anon function, had to add orderid
        stripeKey="pk_test_Q4rJhvGHpIIBZsRPORvPQhPE"
      />
    )
  }
}
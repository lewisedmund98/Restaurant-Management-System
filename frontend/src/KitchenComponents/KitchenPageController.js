import React from 'react';
import KitchenPageWrapper from "./KitchenPageWrapper";

export default class KitchenPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kitchenConfirmed: [],
            toBeDelivered: [],
            twentyFourHours: [],
            accessToken: this.props.accessToken
        };
        this.waiterUnconfirmedArray = [];
        this.getWaiterConfirmed = this.getWaiterConfirmed.bind(this);
        this.req = true;
    }

    

    getWaiterConfirmed(){
        console.log(this.props.accessToken);
        console.log("Running here");
        fetch("https://flask.team-project.crablab.co/orders/list/waiterConfirmed/", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ id: "asdasd123123", key: "abc123", secret: "def456", access_token: this.props.accessToken}) // pulls the order id from the order ID given
        })
        .then(response => response.json())
        .then(result => {
            
            console.log(result);

        })
        
        
    }

    render() {
        if(this.props.accessToken && this.req){
            console.log(this.props.accessToken);
            this.getWaiterConfirmed();
            this.req = false;
        }
        return (
            <KitchenPageWrapper/>
        )
    }
}
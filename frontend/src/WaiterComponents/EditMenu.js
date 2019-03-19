import React from 'react';
import {Button, Modal} from 'semantic-ui-react';

export default class EditMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            enabledOrders : [],
            disabledOrders : [],
        }
        this.pullOrders = this.pullOrders.bind(this);
        this.pullDisabledOrders = this.pullDisabledOrders.bind(this);
        this.pullEnabledOrders = this.pullEnabledOrders.bind(this);
        this.updateOrders = this.updateOrders.bind(this);
    }

    componentDidMount(){
        this.pullOrders();
    }

    async pullOrders(){
        await this.pullDisabledOrders();
        await this.pullEnabledOrders();
    }

    async pullDisabledOrders(){
        console.log("Pulling the disabled orders");
        await fetch("https://flask.team-project.crablab.co/menu/items/disabled",{
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({key: "abc123", secret: "def456"}), // pulls the order id from the order ID given
        })
        .then(response => response.json())
        .then(disabledOrders => {
            console.log(disabledOrders);
        })
    }

    async pullEnabledOrders(){
        console.log("Pulling the enabled orders");
        await fetch("https://flask.team-project.crablab.co/menu/items/enabled",{
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({key: "abc123", secret: "def456"}), // pulls the order id from the order ID given
        })
        .then(response => response.json())
        .then(enabledOrders => {
            console.log(enabledOrders);
        })
    }

    async updateOrders(){
        console.log("updating orders");
    }

    mapEnabledOrders(enabledOrders){

    }

    mapDisabledOrders(disabledOrders){

    }

    render(){
        var enabledOrdersMapped;
        var disabledOrdersMapped;
        if(this.state.enabledOrders){
            enabledOrdersMapped = this.mapEnabledOrders(this.state.enabledOrders);
        }
        if(this.state.disabledOrders){
            disabledOrdersMapped = this.mapDisabledOrders(this.state.disabledOrders);
        }
        return(
            <div>
            <Modal trigger={<Button>Enable Menu Items</Button>}>
            </Modal>
            <Modal trigger={<Button>Diable Menu Items</Button>}>
            </Modal>
            </div>
        )
    }
}
/**
 * This is the waiter page. It will call a waiter page controller. The waiter page controller will then call 
 * a waiter ui wrapper which will then map the elements pulled from the controller into lists of UI elements. 
 */

 /**
 *This is the staff page and requires some of the refactoring and some authentication 
 */

import React from 'react';

import '../index.css';
import WaiterPageController from '../WaiterComponents/WaiterPageController.js';
import { networkInterfaces } from 'os';

export default class Customer extends React.Component {
    constructor(props){
        super(props);
        this.tempGetAccess = this.tempGetAccess.bind(this);
        this.updateAccessToken = this.updateAccessToken.bind(this);
        this.state = {
            accessToken : null,
            
        }
         this.tempGetAccess();
    }

   
    tempGetAccess(){
        
        fetch("https://flask.team-project.crablab.co/authentication/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({username:"test", password:"s3kr3tp4ssw0rd", key: "abc123", secret: "def456"}), // pulls the order id from the order ID given
        })
        .then(result => result.json())
        .then(json => this.setState({accessToken : json.login.access_token}));
    }

    updateAccessToken(newAccessToken){
        console.log(newAccessToken);
        this.setState({
            accessToken: newAccessToken
        })
    }
    
    render() {
        document.title = "Oaxaca Staff";
        
        return (
            <div>
                <div className="loginContainer">
                    <h1>Staff ID is logged in</h1>
                </div>  
                <div className="orderContainer"> 
                    <WaiterPageController  updateToken = {this.updateAccessToken} accessToken = {this.state.accessToken}></WaiterPageController>
                </div>
            </div>
        )
    }
}



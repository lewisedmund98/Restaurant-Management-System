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
import ChooseTable from '../WaiterComponents/ChooseTable';


export default class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.tempGetAccess = this.tempGetAccess.bind(this);
        this.updateAccessToken = this.updateAccessToken.bind(this);
        this.setTables = this.setTables.bind(this);
        this.relog = this.relog.bind(this);
        this.state = {
            accessToken: null,
            userID: null,
            tables: [1,2,3,4]
        }
        this.tempGetAccess();
    }

    relog() {
        console.log("Need to relog!!")
    }

    tempGetAccess() {
        fetch("https://flask.team-project.crablab.co/authentication/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({username:"WillStaff", password:"abc", key: "abc123", secret: "def456"}), // pulls the order id from the order ID given
        })
            .then(result => result.json())
            .then(json => this.setState({
                accessToken: json.login.access_token,
                userID: json.login.userID
            }));
    }

    updateAccessToken(newAccessToken) {
        console.log("Old access " + this.state.accessToken);
        console.log("New Access " + newAccessToken);
        this.setState({
            accessToken: newAccessToken
        })
    }

    setTables(tableList) {
        console.log("!!!!!!!!!!!!!!!!! WHY THE HELL AM I RUNNING ");
        this.setState({
            tables: tableList
        });
        console.log("WHAT AM I DOIONG HERE AND RUNNING");
    }

    render() {
        document.title = "Oaxaca Waiters";
        console.log(this.state.tables);
        return (
            <div>
                <div class="topnav">
                    <img class="logo" src="oaxaca_logo.png" alt="Oaxaca Logo" height="150" width="150"/>
                </div>
                <div className="loginContainer" style={{paddingTop: "1%", paddingBottom: "1%"}}>
                    <ChooseTable setTable={this.setTables}></ChooseTable>
                </div>
                <div className="orderContainer">
                    <WaiterPageController selectedTables={this.state.tables}
                        uID={this.state.userID} updateToken={this.updateAccessToken} accessToken={this.state.accessToken}></WaiterPageController>
                </div>
            </div>
        )
    }
}



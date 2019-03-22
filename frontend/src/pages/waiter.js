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
        this.addAsyncRequest = this.addAsyncRequest.bind(this);
        this.runRequests = this.runRequests.bind(this);
        this.state = {
            accessToken: null,
            userID: null,
            tables: [1, 2, 3, 4]
        }
        this.tempGetAccess();
        this.running = false;
        this.requests = [];
    }

    addAsyncRequest(endpoint, data, callback) {
        var contains = false;
        
            for (var i = 0; i < this.requests.length; i++) {
                console.log("NUMBER 1: " + (JSON.stringify(this.requests[i][1])));
                console.log("NUMBER 2: " + (JSON.stringify(data)));
                if ((this.requests[i][0] === endpoint) && (JSON.stringify(this.requests[i][1]) === JSON.stringify(data))) {
                    console.log("CONTAINS");
                    contains = true;
                }
            }

        if (contains === false) {
            this.requests.push([endpoint, data, callback]);
        }

        if (this.running === false) {
            this.runRequests();
        }
    }

    async runRequests() {
        this.running = true;
        while (this.requests.length !== 0) {
            var newReq = this.requests.shift();
            console.log("Current Req");
            console.log(this.requests);
            var callBack = newReq[2];
            var url = "https://flask.team-project.crablab.co/" + newReq[0];
            var body = newReq[1] === null ?
                { id: this.state.userID, key: "abc123", secret: "def456", access_token: this.state.accessToken } :
                { ...newReq[1], ...{ id: this.state.userID, key: "abc123", secret: "def456", access_token: this.state.accessToken } };
            await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(response => {
                    return response.json();
                })
                // eslint-disable-next-line no-loop-func
                .then(async (json) => {
                    callBack(json);
                    await this.setState({
                        accessToken: json.new_access_token.access_token
                    })
                })

        }  // Empty stack -> No requests
        console.log("here");
        this.running = false;

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
            body: JSON.stringify({ username: "harisWaiter", password: "s3kr3tp4ssw0rd", key: "abc123", secret: "def456" }), // pulls the order id from the order ID given
        })
            .then(result => result.json())
            .then(async (json) => await this.setState({
                accessToken: json.login.access_token,
                userID: json.login.userID
            }));
    }

    updateAccessToken(newAccessToken) {
        //console.log("Old access " + this.state.accessToken);
        //console.log("New Access " + newAccessToken);
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
                    <img class="logo" src="oaxaca_logo.png" alt="Oaxaca Logo" height="150" width="150" />
                </div>
                <div className="loginContainer" style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                    <ChooseTable setTable={this.setTables}></ChooseTable>
                </div>
                <div className="orderContainer">
                    <WaiterPageController addRequest={this.addAsyncRequest} selectedTables={this.state.tables}
                        uID={this.state.userID} updateToken={this.updateAccessToken} accessToken={this.state.accessToken}></WaiterPageController>
                </div>
            </div>
        )
    }
}



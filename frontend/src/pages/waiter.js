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
import {Redirect} from 'react-router-dom';
 
export default class Customer extends React.Component {
    constructor(props) {
        super(props);
        //this.tempGetAccess = this.tempGetAccess.bind(this);
        this.updateAccessToken = this.updateAccessToken.bind(this);
        this.setTables = this.setTables.bind(this);
        this.relog = this.relog.bind(this);
        this.addAsyncRequest = this.addAsyncRequest.bind(this);
        this.runRequests = this.runRequests.bind(this);
        this.state = {
            // REGEX FROM: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
            accessToken: document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"), // Should be set by staff login
            userID: document.cookie.replace(/(?:(?:^|.*;\s*)userID\s*\=\s*([^;]*).*$)|^.*$/, "$1"), // Should be set by Staff login
            badAccessToken : false,
            tables: [1, 2, 3, 4]
        }
        //this.tempGetAccess();
        this.running = false; // If the requests are running 
        this.requests = []; // The list of requests
        this.firstUpdate = true;
    }


    componentWillUnmount(){
        this.requests = [];
    }

    /**
     * This method is important to prevent the 403 issues.
     * This method handles a list of requests made by it's child classes, each request is added
     * as a [endpoint, data, callback] triplet as an array. This represents one request.
     * 
     * The structure is a FIFO structure for the requests so the requests are added to a queue
     * 
     * An example endpoint is without the base of the URL : /endpoint/subEndpoint
     * The data is extra data that is needed for the endpoint to fulfill it's request
     * The callback is a method to which the JSON from the response is passed back. 
     * 
     * @param {endpoint to be called} endpoint 
     * @param {extra data to be passed to the endpoint} data 
     * @param {callback method when the fetch call returns} callback 
     */

    addAsyncRequest(endpoint, data, callback) {
        var contains = false;
        for (var i = 0; i < this.requests.length; i++) { // For each request in the current list
            // Check if the request exists by matching data + endpoint
            if ((this.requests[i][0] === endpoint) && (JSON.stringify(this.requests[i][1]) === JSON.stringify(data))) {
                contains = true;
            }
        }

        if (contains === false) {
            this.requests.push([endpoint, data, callback]); // If it doesn't exist add it to the array
        }

        if (this.running === false) {
            this.runRequests();
        }
    }


    /**
     * Run requests takes the beginning of the queue "this.requests" 
     * It then makes a fetch call for this and does this until the requests array is empty (all done)
     * It takes the information out of each of the requests and then implements it into the fetch call
     */

    async runRequests() {
        this.running = true;
        while (this.requests.length !== 0) {
            var newReq = this.requests.shift(); // Take the beginning of array
            var callBack = newReq[2];           // Take the call back from the request's 3rd element
            var url = "https://flask.team-project.crablab.co/" + newReq[0]; // Take the URL and add it to base
            var body = newReq[1] === null ? // Make the request body checking if passed body is null
                { id: this.state.userID, key: "abc123", secret: "def456", access_token: this.state.accessToken } :
                { ...newReq[1], ...{ id: this.state.userID, key: "abc123", secret: "def456", access_token: this.state.accessToken } };
                await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(async response => {
                    if(response.status === 403){
                        this.requests = [];
                        await this.setState({
                            badAccessToken : true
                        })
                        throw Error("Bad Access Token");
                    } else {
                        return response.json();
                    }
                })
                // eslint-disable-next-line no-loop-func
                .then(async (json) => {
                    callBack(json); // Call the method passed to this class from the waiter page controller
                    await this.setState({
                        accessToken: json.new_access_token.access_token // update the access token
                    })
                    document.cookie = "accessToken=" + json.new_access_token.access_token;
                })
                .catch((error) => {
                    console.log("An error occured" + error);
                })

        }  // Empty stack -> No requests
        this.running = false; // If all the resquests are done, this runs
    }

    /**
     * Relog method which may be implemented if the 403 error becomes a problem
     * Will also work with the logins but those aren't available as of this commit
     */

    relog() {
        console.log("Need to relog!!")
    }

    /**
     * Temp method will be replaced with staff logins
     */

    // tempGetAccess() {
    //     fetch("https://flask.team-project.crablab.co/authentication/login", {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         method: "POST",
    //         body: JSON.stringify({ username: "test", password: "s3kr3tp4ssw0rd", key: "abc123", secret: "def456" }), // pulls the order id from the order ID given
    //     })
    //         .then(result => result.json())
    //         .then(async (json) => 
    //         {
    //             await this.setState({
    //             accessToken: json.login.access_token,
    //             userID: json.login.userID

    //         })
    //     });
    // }

    /**
     * update the access token - deprecated
     * @param {new acces token} newAccessToken 
     */

    updateAccessToken(newAccessToken) {
        //console.log("Old access " + this.state.accessToken);
        //console.log("New Access " + newAccessToken);
        this.setState({
            accessToken: newAccessToken
        })
    }

    /**
     * Adds the new selected tables to the array of tables which are to be used by the 
     * waiter calls
     * 
     * @param {the table list with all the selected tables} tableList 
     */

    setTables(tableList) {
        this.setState({
            tables: tableList
        });
    }

    render() {
        document.title = "Oaxaca Waiters";
        console.log(this.state.accessToken);
        console.log(this.state.tables);
        if(this.state.badAccessToken){
            return(
                <Redirect to={{
                    pathname : "/login"
                }}/>
            )
        }
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



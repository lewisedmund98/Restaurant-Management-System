import React from 'react';
import {Redirect} from 'react-router-dom';
import '../index.css';
import KitchenPageController from "../KitchenComponents/KitchenPageController";
/**
 * Kitchen page landing, has methods to abstract the reqeuests which require authentication
 * and thus is the only page handling access tokens. 
 * 
 * This class handles updating access tokens you just pass it requests which require the access tokens
 */
export default class kitchen extends React.Component {
    constructor(props) {
        super(props);
        //this.tempGetAccess = this.tempGetAccess.bind(this);
        this.state = {
            accessToken: document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"), // Should be set by staff login
            userID: document.cookie.replace(/(?:(?:^|.*;\s*)userID\s*\=\s*([^;]*).*$)|^.*$/, "$1"), // Should be set by Staff login
            badAccessToken : false
        }
        //this.updateAccessToken = this.updateAccessToken.bind(this);
        this.addAsyncRequest = this.addAsyncRequest.bind(this);
        this.runRequests = this.runRequests.bind(this);
        this.running = false; // If there are requests runnnig this becomes true
        this.requests = []; // The list of requests
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
     * request data is accessed by "this.request[1] or [2] or [0]"
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
                contains = true; // Sets contains to true so it won't add the request
            }
        }

        if (contains === false) {
            this.requests.push([endpoint, data, callback]); // If it doesn't exist add it to the array
        }

        if (this.running === false) {
            this.runRequests(); // If the requests aren't running, call the run reequests.
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
                body: JSON.stringify(body) // new body
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
                    callBack(json); // Run the call back passed in from the request
                    await this.setState({
                        accessToken: json.new_access_token.access_token // Update the access token
                    })
                    document.cookie = "accessToken=" + json.new_access_token.access_token;
                })
                .catch((error) => {
                    console.log("An error occured" + error);
                })

        }  // Empty stack -> No requests
        this.running = false; // It's no longer running, can make the call again from addRequests
    }

    // updateAccessToken(newAccessToken) {
    //     console.log("Old: " + this.state.accessToken);
    //     console.log("New: " + newAccessToken);
    //     this.setState({
    //         accessToken: newAccessToken
    //     })
    // }

    // async componentDidMount() { // Temp method needs to be replaced by staff login
    //     await this.tempGetAccess();
    // }

    /**
     * Temporary method will be replaced by the staff login
     */

    // async tempGetAccess() {
    //     await fetch("https://flask.team-project.crablab.co/authentication/login", {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         method: "POST",

    //         body: JSON.stringify({username:"kitchen", password:"s3kr3tp4ssw0rd", key: "abc123", secret: "def456"}), // pulls the order id from the order ID given

    //     })
    //         .then(result => result.json())
    //         .then(async (json) => {
    //             await this.setState({
    //                 accessToken: json.login.access_token,
    //                 userID: json.login.userID
    //             })
    //         });
    // }

   
    render() {
        document.title = "Oaxaca Kitchen";
        if(this.state.badAccessToken){
            return(
                <Redirect to={{
                    pathname : "/login"
                }}/>
            )
        }
        return (
            <div className="kitchenPage">
                <div className="loginContainer">
                    <h1>Staff ID is logged in</h1>
                </div>
                    <h1>Kitchen Order</h1>
                    {/*Render the kitchen page controller with the required props and methods from this class*/}
                    <KitchenPageController uID = {this.state.userID} accessToken = {this.state.accessToken} 
                    addRequest={this.addAsyncRequest} />
            </div>
        )
    }
}
import React from 'react';
import '../index.css';
import KitchenPageController from "../KitchenComponents/KitchenPageController";

export default class kitchen extends React.Component {
    constructor(props) {
        super(props);
        this.tempGetAccess = this.tempGetAccess.bind(this);
        this.state = {
            accessToken: null,
            userID: null
        }
        this.updateAccessToken = this.updateAccessToken.bind(this);
        this.addAsyncRequest = this.addAsyncRequest.bind(this);
        this.runRequests = this.runRequests.bind(this);
        this.running = false;
        this.requests = [];
    }

    addAsyncRequest(endpoint, data, callback) {
        var contains = false;
        for (var i = 0; i < this.requests.length; i++) {
            if ((this.requests[i][0] === endpoint) && (JSON.stringify(this.requests[i][1]) === JSON.stringify(data))) {
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
        this.running = false; // It's no longer running, can make the call again from addRequests
    }

    updateAccessToken(newAccessToken) {
        console.log("Old: " + this.state.accessToken);
        console.log("New: " + newAccessToken);
        this.setState({
            accessToken: newAccessToken
        })
    }

    async componentDidMount() { // Temp method needs to be replaced by staff login
        await this.tempGetAccess();
    }

    /**
     * Temporary method will be replaced by the staff login
     */

    async tempGetAccess() {
        await fetch("https://flask.team-project.crablab.co/authentication/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",

            body: JSON.stringify({username:"kitchen", password:"s3kr3tp4ssw0rd", key: "abc123", secret: "def456"}), // pulls the order id from the order ID given

        })
            .then(result => result.json())
            .then(async (json) => {
                await this.setState({
                    accessToken: json.login.access_token,
                    userID: json.login.userID
                })
            });
    }

    render() {
        document.title = "Oaxaca Kitchen";
        return (
            <div className="kitchenPage">
                <div className="loginContainer">
                    <h1>Staff ID is logged in</h1>
                </div>
                    <h1>Kitchen Order</h1>
                    {/*Render the kitchen page controller with the required props and methods from this class*/}
                    <KitchenPageController uID = {this.state.userID} accessToken = {this.state.accessToken} 
                    addRequest={this.addAsyncRequest} 
                    updateToken = {this.updateAccessToken} />
                
            </div>
        )
    }
}
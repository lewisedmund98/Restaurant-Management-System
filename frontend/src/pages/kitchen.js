import React from 'react';
import '../index.css';
import KitchenPageController from "../KitchenComponents/KitchenPageController";
import { normalizeUnits } from 'moment';

export default class kitchen extends React.Component {
    constructor(props){
        super(props);
        this.tempGetAccess = this.tempGetAccess.bind(this);
        this.state = {
            accessToken : null,
            userID: null
        }
        this.updateAccessToken = this.updateAccessToken.bind(this);
    }

    updateAccessToken(newAccessToken){
        console.log("Old: " + this.state.accessToken);
        console.log("New: " + newAccessToken);
        this.setState({
            accessToken: newAccessToken
        })
    }

    async componentDidMount(){
        await this.tempGetAccess();
    }
    async tempGetAccess(){
        await fetch("https://flask.team-project.crablab.co/authentication/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({username:"WillKitchen", password:"abc", key: "abc123", secret: "def456"}), // pulls the order id from the order ID given
        })
            .then(result => result.json())
            .then(json => {
                this.setState({accessToken : json.login.access_token,
                userID: json.login.userID})
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
                    <KitchenPageController uID = {this.state.userID} accessToken = {this.state.accessToken} updateToken = {this.props.updateToken} />
                
            </div>
        )
    }
}
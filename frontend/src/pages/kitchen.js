import React from 'react';
import '../index.css';
import KitchenPageController from "../KitchenComponents/KitchenPageController";

export default class kitchen extends React.Component {
    constructor(props){
        super(props);
        this.tempGetAccess = this.tempGetAccess.bind(this);
        this.state = {
            accessToken : null
        }
        this.updateAccessToken = this.updateAccessToken.bind(this);
    }

    updateAccessToken(newAccessToken){
        console.log(newAccessToken);
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
            body: JSON.stringify({username:"test", password:"s3kr3tp4ssw0rd", key: "abc123", secret: "def456"}), // pulls the order id from the order ID given
        })
            .then(result => result.json())
            .then(json => this.setState({accessToken : json.login.access_token}));
    }

    render() {
        document.title = "Oaxaca Kitchen";
        return (
            <div className="kitchenPage">
                <div className="loginContainer">
                    <h1>Staff ID is logged in</h1>
                </div>
                <div id="kitchenOrderCardsContainer">
                    <h1>Kitchen Order</h1>
                    <KitchenPageController accessToken = {this.state.accessToken} updateToken = {this.updateAccessToken} />
                </div>
            </div>
        )
    }
}
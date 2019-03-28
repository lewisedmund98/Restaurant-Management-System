import React from 'react';
import LoginPageWrapper from "../LoginComponents/LoginPageWrapper";

/**
 * The Login Controller class is a class which is made to deal with
 * the data that is going to be used to authenticate staff member logins.
 * 
 */

export default class LoginController extends React.Component {
    constructor(props) {
        super(props);
        this.postData = this.postData.bind(this);
        this.state = {
            loggedIn: false
        }
    }

    postData(loginBody) {
        try {
            return fetch("https://flask.team-project.crablab.co/authentication/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: loginBody,
            }).then(res => {
                if (res.status === 500) {
                    return {login: false}
                } else {
                    return res.json();
                }
            })
                .then(res => {
                    var login = res.login;
                    if (login !== false) {
                        this.setState({
                            loggedIn: true
                        })
                        return login;
                    } else {
                        this.setState({
                            loggedIn: false
                        })
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="LoginForm">
                <LoginPageWrapper loggedIn={this.state.loggedIn} postData={this.postData} />
            </div>

        )
    }
}

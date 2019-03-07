import React from 'react';
import LoginPageWrapper from "../LoginComponents/LoginPageWrapper";

/**
 * The Login Controller class is a class which is made to deal with
 * the data that is going to be used to authenticate staff member logins.
 * 
 */

export default class LoginController extends React.Component {
    constructor(props) {
        super (props);
        this.postData = this.postData.bind(this);
        
    }

     postData(loginBody) {
         console.log(loginBody);
        try{
        fetch("https://flask.team-project.crablab.co/handle/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: loginBody,
        }).then(res => res.json())
          .then(json => console.log(json))
        } catch (error) {
            console.log(error);
        }
     }

     render() {
         return(
             <div className="LoginForm">
                <LoginPageWrapper/>
             </div>

         )
     }
 }

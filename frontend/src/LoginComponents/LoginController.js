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
        this.state = {data : null};
    }

     postData() {
        fetch("https://flask.team-project.crablab.co/handle/login", {
            method: "POST",
            headers : new Headers(),
            //body: JSON.stringify(data),
        }).then(res => res.json())
          .then(data => this.setState({ data })); 
     }

     render() {
         return(
             <div className="LoginForm">
                <LoginPageWrapper/>
             </div>

         )
     }
 }

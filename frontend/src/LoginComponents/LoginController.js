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
        
    }

     postData(staffID, Password) {
        fetch("https://flask.team-project.crablab.co/handle/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id : staffID}, {pswd: Password}),
        }).then(res => res.json())
          .then(json => console.log(json))
     }

     render() {
         return(
             <div className="LoginForm">
                <LoginPageWrapper/>
             </div>

         )
     }
 }

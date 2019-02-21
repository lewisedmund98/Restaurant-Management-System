import React from 'react';
import StaffLoginForm from '../StaffComponents/StaffLoginForm.js'

/**
 * The Login Controller class is a class which is made to deal with
 * the data that is going to be used to authenticate staff member logins.
 * 
 */

 class LoginController extends React.Component {
     constructor(props) {
         super (props),
         this.state = {
             data = null;
         }
     }

     postData() {
        fetch("https://flask.team-project.crablab.co/handle/login", {
            method: "POST",
            headers : new Headers(),
            body: JSON.stringify(data),
        }).then(res => res.json())
          .then(data => this.setState({ data })); 
     }

     render() {
         return(
             <div className="LoginForm">
                <StaffLoginForm form={this.props.form} className="staffLoginForm" ></StaffLoginForm>
             </div>

         )
     }
 }

 export default LoginController;

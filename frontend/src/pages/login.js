import React from 'react' 
import LoginController from "../LoginComponents/LoginController";
import '../index.css';

/**
 * This is the login form which allows staff members to login in order to
 * view/edit/remove orders etc.
 */

 export default class login extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
            staffID: "",
            password: ""
         };
     }

     validateForm() {
         return this.state.staffID.length > 0 && this.state.password.length > 0;
     }

     render() {
         document.title = "Oaxaca Staff Login"
         return (
           <div className="loginpage">
             <div className="loginContainer">
              <h1>Staff Login</h1> 
              <LoginController></LoginController>
             </div>
           </div>
         )
     }
 }
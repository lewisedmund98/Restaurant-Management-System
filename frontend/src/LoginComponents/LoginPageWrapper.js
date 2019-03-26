import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

/**
 * This 
 */

export default class LoginPageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffID: null,
      password: null,
      loginPath: null,
      accessToken : null,
      userID : null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.loggedIn = false;
  }

  handleChange(event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value
    });
  }

  // handleLogin(event) {
  //   alert('Login Attempted: ' + this.state.value);
  //   event.preventDefault();
  // }

  async handleLogin(type) {
    try {
      var loginRequestBody = JSON.stringify({
        username: this.state.staffID,
        password: this.state.password,
        key: "abc123",
        secret: "def456"
      });
      await this.props.postData(loginRequestBody)
      .then(async (login) => {
        if(login){ // Not undefined
          console.log(login);
          console.log("Am running");
          await this.setState({
            loginPath : "/"+type,
            accessToken : login.access_token,
            userID : login.userID
          })
        }
      })
    } catch (error) {
      console.log("Something went wrong!" + error);
    }
  }

  kitchenLogin() { // Not needed 
    try {
      var loginRequestBody = JSON.stringify({
        username: this.state.staffID,
        password: this.state.password,
        key: "abc123",
        secret: "def456"
      });
      this.props.postData(loginRequestBody);
    } catch (error) {
      console.log("Something went wrong!" + error);
    }
  }


  render() {
    // var accessToken = "accessToken="+ this.state.accessToken;
    // var userID = "userID=" + this.state.userID;
    document.cookie = "accessToken=" + this.state.accessToken;
    document.cookie = "userID=" + this.state.userID;
    return (
      <Form>
        <Form.Field>
          <label>Staff ID</label>
          <input
            placeholder='Please enter Staff ID here...'
            name="staffID"
            required onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Please enter password here...'
            name="password"
            type = "password"
            required onChange={this.handleChange}
          />
        </Form.Field>
        {(this.props.loggedIn === true && this.state.loginPath !== null) &&
         <Redirect to={{
          pathname: this.state.loginPath,
          state: {
            accessToken: this.state.accessToken,
            userID : this.state.userID
          }
        }}>
        </Redirect>
        }
        <Button type='submit' onClick={() => { this.handleLogin("waiter") }}>Waiter Login</Button>
        <Button type='submit' onClick={() => { this.handleLogin("kitchen") }}>Kitchen Login</Button>
      </Form>

    )
  }
}

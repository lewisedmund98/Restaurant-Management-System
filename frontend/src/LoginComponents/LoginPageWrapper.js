import React from 'react';
import { Button, Form } from 'semantic-ui-react';

/**
 * This 
 */

export default class LoginPageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffID : null,
      password : null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, data){
    const name = data.name;
    const itemData = data.value;
    this.setState({
        [name] : itemData
    });
  }

  handleLogin(event) {
    alert('Login Attempted: ' + this.state.value);
    event.preventDefault();
  }

  createLogin() {
    try {
      var loginRequestBody = JSON.stringify({
        "staffID" : this.state.staffID,
        "password" : this.state.password
      });
      this.props.postData(loginRequestBody);
    } catch (error) {
      console.log("Something went wrong!" + error);
    }
  }

    render() {
        return(
            <Form onSubmit={this.createLogin}>
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
                   required onChange={this.handleChange}
                   />
                </Form.Field>
                <Button type='submit' onClick="location.href='/kitchen'">Login</Button>
            </Form>
        )
    }
}

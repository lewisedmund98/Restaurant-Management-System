import React from 'react';
import { Button, Form } from 'semantic-ui-react';

/**
 * This 
 */

export default class LoginPageWrapper extends React.Component {

  handleChange(event){
    this.setState({
        value: event.target.value
    });
  }

  handleLogin(event) {
    alert('Login Attempted: ' + this.state.value);
    event.preventDefault();
  }

    render() {
        return(
            <Form>
                <Form.Field>
                  <label>Staff ID</label>
                  <input
                   placeholder='Please enter Staff ID here...'
                   name="staffID"
                   //onChange={this.handleChange}
                   />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input placeholder='Please enter password here...'
                   name="password"
                   //onChange={this.handleChange}
                   />
                </Form.Field>
                <Button type='login' onClick="location.href='/kitchen'">Login</Button>
            </Form>
        )
    }
}

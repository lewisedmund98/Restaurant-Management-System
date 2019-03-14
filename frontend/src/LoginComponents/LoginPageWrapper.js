import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

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

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name] : value
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
                   required onChange={this.handleChange}
                   />
                </Form.Field>
                <Link to={{
                        pathname:"/waiter"
                    }}>
                <Button type='submit' onClick={this.createLogin}>Login</Button>
                </Link>
            </Form>
            
        )
    }
}

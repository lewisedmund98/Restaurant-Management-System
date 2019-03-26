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
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name] : value
    });
  }

  handleLogin(event) {
    alert('Login Attempted: ' + this.state.value);
    event.preventDefault();
  }

  waiterLogin() {
    console.log(this.state.staffID);
    console.log(this.state.password);
    if (this.state.staffID == "test" && this.state.password == "s3kr3tp4ssw0rd") {
    try {
      var loginRequestBody = JSON.stringify({
        username : this.state.staffID,
        password : this.state.password,
        key: "abc123",
        secret: "def456"
      });
      this.props.postData(loginRequestBody);
      return true;
    } catch (error) {
      console.log("Something went wrong!" + error);
    }
    } else {
      // if details are not correct keep in login page and show error
    }
  }

  kitchenLogin() {
    console.log(this.state.staffID);
    console.log(this.state.password);
    if (this.state.staffID == "kitchen" && this.state.password == "s3kr3tp4ssw0rd") {
    try {
      var loginRequestBody = JSON.stringify({
        username : this.state.staffID,
        password : this.state.password,
        key: "abc123",
        secret: "def456"
      });
      this.props.postData(loginRequestBody);
    } catch (error) {
      console.log("Something went wrong!" + error);
    }
    } else {
      // if details are not correct keep in login page and show error
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
                <Button type='submit' onClick={()=>{this.waiterLogin()}}>Waiter Login</Button>
                </Link>
                <Link to={{
                        pathname:"/Kitchen"
                    }}>
                <Button type='submit' onClick={()=>{this.kitchenLogin()}}>Kitchen Login</Button>
                </Link>
            </Form>
            
        )
    }
}

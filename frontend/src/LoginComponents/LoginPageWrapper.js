import React from 'react';
import { Button, Form } from 'semantic-ui-react';

/**
 * This 
 */

export default class LoginPageWrapper extends React.Component {
    render() {
        return(
            <Form>
                <Form.Field>
                  <label>Staff ID</label>
                  <input placeholder='Staff ID' />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input placeholder='Password' />
                </Form.Field>
                <Button type='login'>Login</Button>
            </Form>
        )
    }
}

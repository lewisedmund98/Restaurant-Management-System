import React from 'react' 
import { Button, Form } from 'semantic-ui-react'

/**
 * This is the login form which allows staff members to login in order to
 * view/edit/remove orders etc.
 */

 export default class StaffLoginForm extends React.Component {
     constructor(props) {
         super(props);
     }

     render() {
         return (
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

 export default StaffLoginForm;
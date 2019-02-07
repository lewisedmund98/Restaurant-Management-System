import React from 'react';
import { Form, Input, Label, Checkbox, Button, Dropdown} from 'semantic-ui-react';

/* This class will have the order form in it. The form submission will be handled in this class too.

This class gets props in the form of the menu list
*/

export default class OrderForm extends React.Component {
    constructor(props){
        super(props);
        this.menuids= [];
        this.updateMenu = this.updateMenu.bind(this);
        this.createOrder = this.createOrder.bind(this);   
    }

    updateMenu(dishes){
        Object.values(dishes).forEach(dish => {
            this.menuids.push(dish.itemID);
        });
        console.log(this.menuids);
    }

    createOrder(event){
        console.log(event);
    }

    render() {
        var dishes = this.props.currentBasket; 
        var tables = [{key:'1', value:'1', text:'1'}, {key:'2', value:'2', text:'2'}, {key:'3', value:'3', text:'3'}, 
        {key:'4', value:'4', text:'4'}];
        this.updateMenu(dishes);
        return (
            <Form onSubmit={this.createOrder}>
                <Form.Field>
                    <Label>First Name</Label>
                    <Input placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <Label>Last Name</Label>
                    <Input placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <Label>Email Address</Label>
                    <Input placeholder='Email Adress' />
                </Form.Field>
                <Form.Field>
                    <Label>Phone Number</Label>
                    <Input placeholder='Phone Number' />
                </Form.Field>
                <Form.Field>
                <Dropdown placeholder='Select a table...' search selection options={tables} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit'>Confirm and pay</Button>
            </Form>
        )
    }
}
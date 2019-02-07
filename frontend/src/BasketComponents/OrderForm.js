import React from 'react';
import { Form, Input, Label, Checkbox, Button, Dropdown } from 'semantic-ui-react';

/* This class will have the order form in it. The form submission will be handled in this class too.

This class gets props in the form of the menu list
*/

export default class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.menuids = [];
        this.state = { // The state are when the user inputs into the fields this is updated. 
            firstName: null,
            secondName: null,
            email: null,
            phone: null,
            tableNumber: null
        };
        this.updateMenu = this.updateMenu.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.dishes = this.props.currentBasket;
        this.tables = [{ key: '1', value: '1', text: '1' }, { key: '2', value: '2', text: '2' }, { key: '3', value: '3', text: '3' },
        { key: '4', value: '4', text: '4' }];
    }

    updateMenu(dishes) {
        this.menuids = [];
        Object.values(dishes).forEach(dish => {
            this.menuids.push(dish.itemID);
        });
        console.log(this.menuids);
    }

    createOrder() {

        try {
            alert("You submitted the form, the details: firstname- " + this.state.firstName +
                " secondname " + this.state.secondName +
                " email " + this.state.email +
                " phone " + this.state.phone +
                " and your table number " + this.state.tableNumber);

        } catch (error) {
            console.log("Something went wrong");
        }
    }

    handleInputChange(event) { // There is an issue with the dropdown.
        const target = event.target;

        const value = target.value;

        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {

        this.updateMenu(this.dishes);
        return (
            <Form onSubmit={this.createOrder}>
                <Form.Field>
                    <Label>First Name</Label>
                    <Input required onChange={this.handleInputChange} name="firstName" placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <Label>Last Name</Label>
                    <Input required onChange={this.handleInputChange} name="secondName" placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <Label>Email Address</Label>
                    <Input required onChange={this.handleInputChange} name="email" placeholder='Email Adress' />
                </Form.Field>
                <Form.Field>
                    <Label>Phone Number</Label>
                    <Input required onChange={this.handleInputChange} name="phone" placeholder='Phone Number' />
                </Form.Field>
                <Form.Field>
                    <Label>Table Number</Label>
                    <Dropdown required onChange={this.handleInputChange} name="tableNumber"
                        placeholder='Select a table...' search selection options={this.tables} />

                </Form.Field>
                <Form.Field>
                    <Checkbox required label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit'>Confirm and pay</Button>
            </Form>
        )
    }
}
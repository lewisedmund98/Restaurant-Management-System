import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

/**
 * The call waiter class is a class which handles the users callng the waiters. It includes the
 * view for the user to use, whih is the modal view to which the user clicks on their table and then can select the
 * call waiter buttons
 * 
 * To use this class use : <CallWaiter>
 * 
 */

export default class CallWaiter extends React.Component {
    constructor(props) {
        super(props);
        this.makeCallToWaiter = this.makeCallToWaiter.bind(this);
        this.handleSetTable = this.handleSetTable.bind(this);
        this.state = {
            table: null,
            selected: false,
            called: false
        }
        this.called = false;
    }

    /**
     * Make call to waiter is a method which interacts with the backend. It makes a call by using
     * the call waiter endpoint. 
     * 
     * It passes, to this call the client key secret and the table number to call which then 
     * gets polled on the waiter page and the notificaiton pops up.
     */
    makeCallToWaiter() {
        this.setState({
            called: true
        })
        if (!this.state.selected) {
            console.log("Please select a table");
            return;
        } else {
            fetch("https://flask.team-project.crablab.co/notifications/callWaiter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "table": this.state.table, "key": "abc123", "secret": "def456", "id": "sakjahkjh23989" })
            })
            .then(response => response.json())
            .then(json =>{
                console.log("Called waiter");
                console.log(json);
            })
        }
    }

    /**
     * Handle set table is an event driven method, when the button is clicked 
     * assigns the table to the current table that needs to be used. 
     * 
     * @param {onclick event by setting table button} event 
     */
    
    handleSetTable(event) {
        if (this.state.table === event.target.value) {
            this.setState({
                table: null,
                selected: false
            })
        } else {
            this.setState({
                table: event.target.value,
                selected: true
            });
        }
    }

    /**
     * Resets the tables for the user if they want to select something, or nothing.
     */
    resetCalledSelected(){
        this.setState({
            selected: false,
            called: false,
            table: null
        }); 
    }

    render() {
        var table = this.state.table === null ? "None" : this.state.table; // Check if stable is null, then none.
        console.log(table)
        return (
            <Modal trigger={<Button onClick={() => {this.resetCalledSelected()}} className="callWaiterModalTrigger" >Call Waiter</Button>}>
                <Modal.Header style={{textAlign: "center"}}>
                    Which table are you sitting at?
                </Modal.Header>
                <Modal.Content>
                    <div style={{textAlign: "center"}}>
                        <div style={{display: "block", marginRight: "auto", marginLeft: "auto"}}>
                            <Button className="tableNumberBtnCustomer" value="1" onClick={(e) => { this.handleSetTable(e) }}>1</Button>
                            <Button className="tableNumberBtnCustomer" value="2" onClick={(e) => { this.handleSetTable(e) }}>2</Button>
                            <Button className="tableNumberBtnCustomer" value="3" onClick={(e) => { this.handleSetTable(e) }}>3</Button>
                            <Button className="tableNumberBtnCustomer" value="4" onClick={(e) => { this.handleSetTable(e) }}>4</Button>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Description>
                    <div>
                        <div>
                            <h3 style={{textAlign: "center"}}><b>Your table: {table}</b></h3>
                            {/**Conditional rendering based on the truth value on whether its selected*/}
                            {this.state.selected === false && this.state.called === true &&
                                <h3 className="selectTableWarning"> Please select a table! </h3>
                            }
                            {this.state.selected === true && this.state.called === true && 
                                <h2 style={{textAlign: "center"}}> A waiter will be with you shortly </h2>
                            }
                        </div>
                        <div>
                            <Button className="call" onClick={() => { this.makeCallToWaiter() }}>Call</Button>
                        </div>
                        
                    </div>
                </Modal.Description>
            </Modal>
        )
    }
}
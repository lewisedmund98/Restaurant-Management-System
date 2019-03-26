import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

/**
 * This is the component for the waiter to be able to choose the table for the waiter,
 * it contains the buttons for the waiter to be able to select the table and the logic to handle the array 
 * of the chosen tables
 * 
 * This class is called by "/pages/waiter.js"
 */

export default class ChooseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenTables: [] // All of the currently chose tables
        }
        this.selectchosenTables = this.selectchosenTables.bind(this);
        this.addTable = this.addTable.bind(this);
        this.checkTableList = this.checkTableList.bind(this);
    }

    /**
     * Finalises the choice of the waiter for their chosen tables. It calls the method in the parent
     * class which sets the table and updates the parent class's state.
     */

    selectchosenTables() {
        if (this.state.chosenTables.length === 0) {
        } else {
            this.props.setTable(this.state.chosenTables); // Call to parent class with currently selected tables
        }
    }

    /**
     * Add table is an event handler method
     * 
     * When a user clicks on one of the tables it adds the tables to the array 
     * of chosen tables.
     * 
     * @param {onClick event from each of the buttons for selecting the tables} event 
     */

    addTable(event) {
        var tableNumber = event.target.value; // Takes the value from the event from button click
        var tableArrayCopy = this.state.chosenTables; // Copies the current version of the array
        if (!this.checkTableList(tableNumber)) { // Doesn't contain the table number
            tableArrayCopy.push(parseInt(tableNumber)); // Parses the integer value
            this.setState({
                chosenTables: tableArrayCopy // Sets the new state.
            })
        }
    }

    /**
     * Returns true if the table list includes the table number passed as an argument
     * 
     * @param {table number to check if exists} tableNumber 
     */

    checkTableList(tableNumber) {
        return this.state.chosenTables.includes(parseInt(tableNumber));
    }

    render() {
        return (
            // A modal to show the user interaction to select the tables.
            <Modal trigger={<Button style={{ backgroundColor: "rgb(31, 112, 233)", color: "white", display: "block", marginLeft: "auto", marginRight: "auto" }}>Choose Tables</Button>}>
                <Modal.Content>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
                            <h1>Tables:</h1>
                            {/*Each button has an onclick function handler and these call addTAble*/}
                            <Button className="tableNumberBtnWaiter" value="1" onClick={(e) => { this.addTable(e) }}>1</Button>
                            <Button className="tableNumberBtnWaiter" value="2" onClick={(e) => { this.addTable(e) }}>2</Button>
                            <Button className="tableNumberBtnWaiter" value="3" onClick={(e) => { this.addTable(e) }}>3</Button>
                            <Button className="tableNumberBtnWaiter" value="4" onClick={(e) => { this.addTable(e) }}>4</Button>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Description>
                    <div style={{ textAlign: "center", paddingBottom: "1%" }}>
                        <div style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
                            {/*Button to select the tables and cement them in the waiter class*/}
                            <Button className="chooseTableActions" style={{ backgroundColor: "green", color: "white" }} onClick={() => { this.selectchosenTables() }}>Set Tables</Button>
                            {/*Button to reset the chosen tables to an empty array*/}
                            <Button className="chooseTableActions" style={{ backgroundColor: "#D04236", color: "white" }} onClick={() => { this.setState({ chosenTables: [] }) }}>Reset</Button>
                        </div>
                    </div>
                </Modal.Description>
            </Modal>

        )
    }
}
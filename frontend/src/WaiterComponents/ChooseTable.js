import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default class ChooseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenTables: []
        }

        this.selectchosenTables = this.selectchosenTables.bind(this);
        this.addTable = this.addTable.bind(this);
        this.checkTableList = this.checkTableList.bind(this);
    }

    selectchosenTables() {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        if (this.state.chosenTables.length === 0) {
            console.log("Please choose a table");
        } else {
            this.props.setTable(this.state.chosenTables);
            console.log(this.state.chosenTables);
        }

    }

    addTable(event) {
        var tableNumber = event.target.value;
        var tableArrayCopy = this.state.chosenTables;
        console.log(this.state.chosenTables);
        if (!this.checkTableList(tableNumber)) { // Doesn't contain the table
        console.log("PUSHING");
            tableArrayCopy.push(parseInt(tableNumber));
            this.setState({
                chosenTables:tableArrayCopy
            })
        }
    }

    checkTableList(tableNumber) {
        return this.state.chosenTables.includes(parseInt(tableNumber));
    }

    render() {
        return (
            <Modal trigger={<Button style ={{backgroundColor: "blue", color: "white", display: "block", marginLeft: "auto", marginRight: "auto"}}>Choose Tables</Button>}>
                <Modal.Content>
                    <Button value="1" onClick={(e) => { this.addTable(e) }}>1</Button>
                    <Button value="2" onClick={(e) => { this.addTable(e) }}>2</Button>
                    <Button value="3" onClick={(e) => { this.addTable(e) }}>3</Button>
                    <Button value="4" onClick={(e) => { this.addTable(e) }}>4</Button>
                </Modal.Content>
                <Modal.Description>
                    <Button onClick={() => { this.selectchosenTables() }}>Set Tables</Button>
                    <Button onClick={() => { this.setState({ chosenTables: [] }) }}>Reset</Button>
                </Modal.Description>
            </Modal>

        )
    }
}
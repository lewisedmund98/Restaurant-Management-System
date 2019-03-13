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
            <Modal trigger={<Button style ={{backgroundColor: "blue", color: "white", display: "block", marginLeft: "auto", marginRight: "auto" }}>Choose Tables</Button>}>
                <Modal.Content>
                    <div style={{textAlign: "center"}}>
                        <div style={{display: "block", marginLeft: "auto", marginRight: "auto"}}>
                            <h1>Tables:</h1>
                            <Button className="tableNumberBtnWaiter" value="1" onClick={(e) => { this.addTable(e) }}>1</Button>
                            <Button className="tableNumberBtnWaiter" value="2" onClick={(e) => { this.addTable(e) }}>2</Button>
                            <Button className="tableNumberBtnWaiter" value="3" onClick={(e) => { this.addTable(e) }}>3</Button>
                            <Button className="tableNumberBtnWaiter" value="4" onClick={(e) => { this.addTable(e) }}>4</Button>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Description>
                    <div style={{textAlign: "center", paddingBottom: "1%"}}>
                        <div style={{display: "block", marginLeft: "auto", marginRight: "auto"}}>
                            <Button className="chooseTableActions" style={{backgroundColor: "green", color: "white"}} onClick={() => { this.selectchosenTables() }}>Set Tables</Button>
                            <Button className="chooseTableActions" style={{backgroundColor: "#D04236", color: "white"}} onClick={() => { this.setState({ chosenTables: [] }) }}>Reset</Button>
                        </div>
                    </div>
                </Modal.Description>
            </Modal>

        )
    }
}
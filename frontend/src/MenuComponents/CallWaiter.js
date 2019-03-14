import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

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

    render() {
        var table = this.state.table === null ? "None" : this.state.table;
        console.log(table)
        return (
            <Modal trigger={<Button style={{border: "dashed orange", backgroundColor: "white", color: "rgb(31, 112, 233)"}}>Call Waiter</Button>}>
                <Modal.Header style={{textAlign: "center"}}>
                    Which table are you sitting at?
                </Modal.Header>
                <Modal.Content className="tableNumberBtnCustomer">
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
                            {this.state.selected === false && this.state.called === true &&
                                <h3 className="selectTableWarning"> Please select a table! </h3>
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
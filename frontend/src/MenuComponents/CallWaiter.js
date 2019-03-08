import React from 'react';
import {Modal, Button} from 'semantic-ui-react';

export default class CallWaiter extends React.Component{
    constructor(props){
        super(props);
        this.makeCallToWaiter = this.makeCallToWaiter.bind(this);
        this.handleSetTable = this.handleSetTable.bind(this);
        this.state={
            table: null
        }
    }

    makeCallToWaiter(){ 
        console.log("Calling Waiter");
        if(this.state.table == null){
            console.log("Please select a table");
            return;
        }
        console.log("Table " + this.state.table);

    }

    handleSetTable(event){
        if(this.state.table === event.target.value){
            this.setState({
                table: null
            })
        } else {
            this.setState({
                table: event.target.value
            });
        }
    }

    render(){
        var table = this.state.table === null? "None" : this.state.table;
        console.log(table)
        return(
            <Modal trigger={<Button>Call Waiter</Button>}>
                <Modal.Header>
                    Which table are you sitting at?
                </Modal.Header>
                <Modal.Content>
                    <Button value="1" onClick={(e) => {this.handleSetTable(e)}}>1</Button>
                    <Button value="2" onClick={(e) => {this.handleSetTable(e)}}>2</Button>
                    <Button value="3" onClick={(e) => {this.handleSetTable(e)}}>3</Button>
                    <Button value="4" onClick={(e) => {this.handleSetTable(e)}}>4</Button>
                </Modal.Content>
                <Modal.Description>
                    <Button className="call" onClick={()=>{this.makeCallToWaiter()}}>Call</Button>
                    <p style={{float: "right"}}><b>Your table: {table}</b></p>        
                </Modal.Description>
            </Modal>
        )
    }
}
import React from 'react';
import {Modal, Button} from 'semantic-ui-react';

export default class ChooseTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tables: []
        }

        this.selectTables = this.selectTables.bind(this);
        this.addTable = this.addTable.bind(this);
        this.checkTableList = this.checkTableList.bind(this);
    }

    selectTables(){
        this.props.setTable(this.state.tables);
        console.log(this.state.tables);
    }

    addTable(event){
        var tableNumber = event.target.value;
        var tableArrayCopy = this.state.tables;
        if(!this.checkTableList(tableNumber)){ // Doesn't contain the table
            tableArrayCopy.push(tableNumber);
            // this.setState({
            //     tables:tableArrayCopy
            // })
        }   
    }

    checkTableList(tableNumber){
        return this.state.tables.includes(tableNumber);
    }

    render(){
        return(
            <Modal trigger={<Button>Choose Tables</Button>}>
                <Modal.Content>
                    <Button value="1" onClick={(e) => { this.addTable(e) }}>1</Button>
                    <Button value="2" onClick={(e) => { this.addTable(e) }}>2</Button>
                    <Button value="3" onClick={(e) => { this.addTable(e) }}>3</Button>
                    <Button value="4" onClick={(e) => { this.addTable(e) }}>4</Button>
                </Modal.Content>
                <Modal.Description>
                    <Button onClick={()=>{this.selectTables()}}>Set Tables</Button>
                    <Button onClick={()=>{this.setState({tables : []})}}>Reset</Button>
                </Modal.Description>
            </Modal>

        )
    }
}
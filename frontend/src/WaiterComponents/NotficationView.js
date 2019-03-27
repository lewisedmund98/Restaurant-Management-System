import React from 'react';
import { Modal , Button } from 'semantic-ui-react';
/**
 * The notification view is a modal from semantic UI react. It is used to demonstrate each of the 
 * notifications that are made by the WaiterPageController. 
 * 
 * Each notification made has a to be displayed boolean value. Once the user clicks "Confirm" 
 * it then becomes undisplayed.
 */
export default class NotificationModal extends React.Component {
    constructor(props) {
        super(props);
        //this.toDisplay = true;
        this.state={
            toDisplay: true // To display
        }
    }

    render() {
        var moment = require('moment'); // Time library
        var time = moment.unix(this.props.timeCreated).format("DD MMM YYYY hh:mm a"); // Unix -> Human
        return (
            <div>
                {this.state.toDisplay === true &&
                    <Modal open={this.state.toDisplay} style={{textAlign: "center"}}> {/*Only display if its true to displaay*/}
                    <Modal.Content>
                        <h1>Table : {this.props.tableNumber} Needs Assistance!!</h1>
                        <h3>{time}</h3>

                        <Button id='closeTableAssistanceNoticeBtn' onClick={()=>{this.setState({toDisplay: false})}}>Close</Button>
                    </Modal.Content>
                    </Modal>
                }
            </div>
        )
    }
}
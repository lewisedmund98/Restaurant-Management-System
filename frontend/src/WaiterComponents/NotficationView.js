import React from 'react';
import { Modal , Button } from 'semantic-ui-react';

export default class NotificationModal extends React.Component {
    constructor(props) {
        super(props);
        //this.toDisplay = true;
        this.state={
            toDisplay: true
        }
    }

    render() {
        var moment = require('moment');
        var time = moment.unix(this.props.timeCreated).format("DD MMM YYYY hh:mm a");
        return (
            <div>
                {this.state.toDisplay === true &&
                    <Modal open={this.state.toDisplay}>
                    <Modal.Content>
                        <h3>Table : {this.props.tableNumber} Needs Assistance!!</h3>
                        <h3>{time}</h3>

                        <Button onClick={()=>{this.setState({toDisplay: false})}}>Close</Button>
                    </Modal.Content>
                    </Modal>
                }
            </div>
        )
    }
}
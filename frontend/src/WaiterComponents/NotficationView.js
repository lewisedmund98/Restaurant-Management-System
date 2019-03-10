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
        return (
            <div>
                {this.state.toDisplay === true &&
                    <Modal open={this.state.toDisplay}>
                    <Modal.Content>
                        <Button onClick={()=>{this.setState({toDisplay: false})}}>Close</Button>
                    </Modal.Content>
                    </Modal>
                }
            </div>

        )
    }
}
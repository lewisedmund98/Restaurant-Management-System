import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

export default class OrderTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderProgress : [{ key: 'created', content: 'created', active: true }]
        }
    }

    orderStage(newStage) {
        if (this.props.stage !== this.state.orderProgress[this.state.orderProgress.length-1].key) {
            const tempOrderArray = this.state.orderProgress;
            tempOrderArray[tempOrderArray.length - 1].active = false;

            const newElement = {key: newStage, content: newStage, active: true};
            tempOrderArray.push(newElement);

            this.setState({
                orderProgress: tempOrderArray
            });
        }
    }

    render() {
        this.orderStage(this.props.stage);
        return (
            <Breadcrumb icon='right arrow' sections={this.state.orderProgress} />
        )
    }
}
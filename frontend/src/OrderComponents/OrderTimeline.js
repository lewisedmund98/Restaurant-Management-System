import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

export default class OrderTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.progress = [{ key: 'created', content: 'created', active: true }];
    }

    orderStage(newStage) {
        if (this.props.stage !== this.progress[this.progress.length-1].key) {
            const tempOrderArray = this.progress;
            tempOrderArray[tempOrderArray.length - 1].active = false;

            const newElement = {key: newStage, content: newStage, active: true};
            tempOrderArray.push(newElement);

            this.progress = tempOrderArray;
        }
    }

    render() {
        this.orderStage(this.props.stage);
        return (
            <Breadcrumb className="timelineBreadcrumb" icon='right arrow' sections={this.progress} />
        )
    }
}
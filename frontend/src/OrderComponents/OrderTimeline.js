import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

export default class OrderTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.progress = [{ key: 'created', content: 'created', active: true }];
        this.duplicate = false;
    }

    orderStage(newStage) {
        const newElement = {key: newStage, content: newStage, active: true};
        for (const index of this.progress) {
            if (index.key === newElement.key) {
                this.duplicate = true;
            }
        }
        if (this.duplicate === false) {
            const tempOrderArray = this.progress;
            tempOrderArray[tempOrderArray.length - 1].active = false;

            tempOrderArray.push(newElement);

            this.progress = tempOrderArray;
        }
        this.duplicate = false;
    }

    render() {
        this.orderStage(this.props.stage);
        return (
            <Breadcrumb icon='right arrow' sections={this.progress} />
        )
    }
}
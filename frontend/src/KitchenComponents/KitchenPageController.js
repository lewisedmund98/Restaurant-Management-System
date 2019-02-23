import React from 'react';
import KitchenPageWrapper from "./KitchenPageWrapper";
import {Card} from 'semantic-ui-react';

export default class KitchenPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unconfirmedOrders: [],
            toBeDelivered: [],
            twentyFourHours: [],
            accessToken: this.props.accessToken
        };

    }

    render() {
        return (
            <KitchenPageWrapper/>
        )
    }
}
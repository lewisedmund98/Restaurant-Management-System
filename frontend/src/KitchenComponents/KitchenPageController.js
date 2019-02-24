import React from 'react';
import KitchenPageWrapper from "./KitchenPageWrapper";

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
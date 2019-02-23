import React from 'react';
import KitchenItemsView from "./KitchenItemsView";
import { Card, Button } from 'semantic-ui-react';

export default class KitchenPageWrapper extends React.Component {
    render() {
        return (
            <React.fragment>
                <Card className="menuCard">
                    <Card.content>
                        <KitchenItemsView unconfirmed={true} />
                    </Card.content>
                    <Card.Content extra={true}>
                        <Button>+5</Button>
                    </Card.Content>
                </Card>
            </React.fragment>
        )
    }
}
import React from 'react';
import KitchenItemsView from "./KitchenItemsView";
import {Card, Button} from 'semantic-ui-react';

export default class KitchenPageWrapper extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <h3>Dishes</h3>
                    <KitchenItemsView/>
                </Card.Content>
                <Card.Content extra>
                    <Button className="kitchenTimeButton">3</Button>
                    <Button className="kitchenTimeButton">5</Button>
                    <Button className="kitchenTimeButton">10</Button>
                    <Button className="kitchenTimeButton">15</Button>
                    <Button className="kitchenTimeButton">20</Button>
                    <Button className="kitchenTimeButton">30</Button>
                    <Button id="kitchenConfirmButton">Confirmed</Button>
                </Card.Content>
            </Card>
        )
    }
}
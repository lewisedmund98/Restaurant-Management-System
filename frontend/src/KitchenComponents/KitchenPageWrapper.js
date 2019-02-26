import React from 'react';
import KitchenItemsView from "./KitchenItemsView";
import {Card, Button} from 'semantic-ui-react';

export default class KitchenPageWrapper extends React.Component {
    render() {
        return (
            <Card className="kitchenCard">
                <Card.Content>
                    <h3>Dishes</h3>
                    <KitchenItemsView/>
                </Card.Content>
                <Card.Content extra>
                    <div id="kitchenOrderButtons">
                        <div id="kitchenTimeButtons">
                            <Button className="kitchenTimeButton">05</Button>
                            <Button className="kitchenTimeButton">10</Button>
                            <Button className="kitchenTimeButton">20</Button>
                            <Button className="kitchenTimeButton">30</Button>
                            <Button id="kitchenConfirmButton">Confirm</Button>
                        </div>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}
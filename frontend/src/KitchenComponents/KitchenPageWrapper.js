import React from 'react';
import KitchenItemsView from "./KitchenItemsView";
import {Card, Button} from 'semantic-ui-react';

export default class KitchenPageWrapper extends React.Component {
    render() {
        return (
            <React.fragment>
                <h1>Incoming Order</h1>
                <div style={{padding: "20px"}} className="kitchenOrderDiv">
                    <Card className="kitchenOrderCard">
                        <Card.content>
                            <Button>+5</Button>
                            <KitchenItemsView unconfirmed={true}/>
                        </Card.content>
                        <Card.Content extra>
                            <Button>+5</Button>
                            <Button>+10</Button>
                            <Button>+15</Button>
                            <Button>+20</Button>
                            <Button>+25</Button>
                            <Button>+30</Button>
                        </Card.Content>
                    </Card>
                </div>
            </React.fragment>
        )
    }
}
import React from 'react';
import { List, Image, Button } from 'semantic-ui-react';
/**
 * Wrapper for a basket item. This will show the image for the item, the name, the quantity and the price.
 * 
 * The basket is ready to 'POST' itself and its items to the server. 
 */


export default class BasketItem extends React.Component {
    constructor(props) {
        super(props);
        this.mapBasketToUI = this.mapBasketToUI.bind(this);
    }

    mapBasketToUI(currentBasket) {
        var mappedBasket = currentBasket.map((currentDish, key) =>
        <div className="singleBasketItem">

            <List celled key={key}>
                <List.Item>
                    <Image avatar={true} src={currentDish.itemImage}></Image>
                    <List.Content>
                        <List.Header>
                            {currentDish.itemName}
                        </List.Header>
                        <List.Description>
                            <b>
                                £{currentDish.itemPrice}
                            </b>
                            <Button onClick={()=>this.props.onRemove(currentDish)}>Remove This Item</Button>
                        </List.Description>
                        
                    </List.Content>
                </List.Item>
            </List>
        </div>
        )

        return mappedBasket;
    }

    render() {
        var mappedBasket = this.mapBasketToUI(this.props.currentBasket);
        return (
            <div className="listOfItems" style={{ textAlign: "center" }}>{mappedBasket}</div>
        )
    }
}
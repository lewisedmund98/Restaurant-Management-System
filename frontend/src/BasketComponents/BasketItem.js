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

    /**
     * This method simply maps each of the dishes in the basket to a List item
     * with some of the dish information adn the price. It also renders a button
     * which is used when the user wishes to remove an item. 
     * 
     * The button "Remove This Item" calls a props based event from the "CustomerPageController" which
     * handles the logic to remove a particular dish. Each list item knows which dish it holds.
     * 
     * @param {The current whole basket that the user has chose} currentBasket 
     */
    mapBasketToUI(currentBasket) {
        var mappedBasket = currentBasket.map((currentDish, key) =>
        <div className="singleBasketItem">

            <List celled key={key}>
                <List.Item>
                    <Image avatar={true} src={currentDish.itemImage}></Image>
                    <List.Content>
                        <List.Header id="orderDishName">
                            {currentDish.itemName}
                        </List.Header>
                        <List.Description>
                            <b>
                                £{currentDish.itemPrice}
                            </b>
                            <Button id="removeItemButton" onClick={()=>this.props.onRemove(currentDish)}>Remove This Item</Button>
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
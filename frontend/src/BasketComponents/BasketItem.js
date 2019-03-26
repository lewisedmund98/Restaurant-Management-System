import React from 'react';
import { List, Image, Button } from 'semantic-ui-react';
/**
 * Wrapper for a basket item. This will show the image for the item, the name, the quantity and the price.
 * 
 * To use this class you must instantuiate it with <BasketItem> passing it properties
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
                    {/*Image to represent the item image */}
                    <Image className="basketItemIcon" avatar={true} src={currentDish.itemImage}></Image>
                    <List.Content className="singleBasketListHeadAndDes" >
                        <List.Header id="orderDishName">
                            {currentDish.itemName}
                        </List.Header>
                        <List.Description className="singleBasketListHeadAndDes">
                            <b>
                                £{currentDish.itemPrice}
                            </b>
                        </List.Description>
                    </List.Content>
                    {/*Makes a call to remove the item from parent class*/}
                    <Button className="removeBasketItemBtn" onClick={()=>this.props.onRemove(currentDish)}><b>-</b></Button>
                </List.Item>
            </List>
        </div>
        )
        return mappedBasket;
    }

    render() {
        var mappedBasket = this.mapBasketToUI(this.props.currentBasket); // Map the basket to UI components
        return (
            <div className="listOfItems" style={{ textAlign: "center" }}>
            {mappedBasket}
            </div>
        )
    }
}
import React from 'react';
import {Image, Card, Icon, Button} from 'semantic-ui-react';

/**
 * This class is meant to be a container for a single menu item ie A Single <b> Dish </b>.
 * The Card used is a part of the Semantic UI React library for UI components. 
 * 
 * The class takes properties and then displays those properties appropriately within the card.
 * 
 * The card will take an image from the properties as the "dishImage"
 * The card header will display the "dishName"
 * The card Description will display the "dishInfo"
 * The card meta will display the "dishPrice"
 * 
 * The extra section of the Card will also display icons, one of which opens up allergy information
 * and the other adds the dish to the basket. 
 * 
 * 
 */
class MenuItemCard extends React.Component{
    constructor(props){
        super(props);
        const dishID = this.props.dishID; // dishID is a unique identifier for each dish.
    }

    render(){
        return(
            <React.Fragment>
                <Card className="menuCard"> {/*The main wrapper component for the whole card - from Library*/}
                    <Image className="dishImage"src={this.props.dishImage}/>
                    <Card.Content textAlign={"center"}> {/*Wraps main body of card while "extra" tag wraps the bottom*/}
                        <Card.Header className="dishName"> {this.props.dishName} </Card.Header>
                        <Card.Description className="dishInfo"> {this.props.dishInfo} </Card.Description>
                        <Card.Meta className="dishPrice"> {this.props.dishPrice} </Card.Meta>
                    </Card.Content>

                    <Card.Content extra={true}>
                        <Button className="addToBasket" id={this.props.dishID} icon={true}> {/* Button for adding the item to basket */}
                            <Icon name="plus"/>
                        </Button>

                        <Button className="infoIconButton" icon={true}>
                            <Icon name="info"></Icon>
                        </Button>

                    </Card.Content>

                </Card>
            </React.Fragment>
        )
    }
}

export default MenuItemCard; // This is so that the rest of the program can access the MenuItemCard using: import <name> from MenuCard.js

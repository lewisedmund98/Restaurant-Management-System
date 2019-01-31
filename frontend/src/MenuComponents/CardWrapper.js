import React from 'react';
import MenuCard from './MenuCard.js';
import { Card } from 'semantic-ui-react';

/**
 * The card wrapper takes the data from the TabWrapper and simply renders it. It's a view class 
 * in the MVC arcitecture. 
 * 
 * If you wish to add extra items to the card it is done here and within MenuCard too. You must
 * add more properties where we map the JSON object array.
 * 
 * The tab wrapper passes a specific subset of the final menu and each of those subsets is
 * a set of cards to be displayed.  
 * 
 */

class CardWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.mapJsonToComponent = this.mapJsonToComponent.bind(this); // We must bind the function to use it
    }
    /*
        Take the properties passed by the controller and reactively map it to an array with keys 
        based on the JSON and then render the array as an unordered list in HTML. 

    */
    mapJsonToComponent(dishList) {
        var mappedDishList = dishList.map((dish, key) => // Map and create a new react component for each JSON object
            <MenuCard key={key} dishID={dish.dishID} dishName={dish.dishName} dishImage={dish.dishImage} dishInfo={dish.dishInformation}
                dishPrice={dish.dishPrice} dishAllergies={dish.dishAllergies} dishCalories={dish.dishCalories} />
        )

        return mappedDishList;
    }
    render() {
        var dishList = this.mapJsonToComponent(this.props.dishList); // Call to map
        return (
            <Card.Group className="cardWrapper"> {/*Card Group is used to make it horizontal*/}
                {dishList} {/*React is able to render the list properly in this format - from documentation*/}
            </Card.Group>
        )

    }
}

export default CardWrapper;
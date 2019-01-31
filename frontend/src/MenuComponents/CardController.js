import React from 'react';
import TabWrapper from './TabWrapper.js';

/**
 * The Card Controller class is a class which is made to deal with the data that is going to be used in the
 * menu cards. This makes the API call and then stores the data in a state. This state propogates through
 * the program. This means that the properties of CardWrapper and MenuCard update when this updates.
 * 
 * This decouples the CardController from the Card wrapper.
 * 
 * The CardController calls the TabWrapper and passes in a JSON object array as properties. The logic
 * for how that is handled and rendered is in the TabWrapper class which takes the list and splits it into menu items
 * 
 * The controller can be made better by using a thread which updates the API call if the menu changes all
 * of a sudden.
 * 
 * CURRENT HIERACHY: CardController -> TabWrapper (Splits into 4 TYPES) -> CardWrapper (Makes 4 of these) -> 
 * MenuCard (Takes the items and displays) -> InfoModal (Event from MenuCard)
 * 
 * Note: Fetch is an asynchronous call so state must be used and may take a while to update a user PC if it's slow.
 */

class CardController extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // Sets the current state variables to contain a dish list. This will be populated by JSON objects
            dishList: []
        };
    }

    componentDidMount() { // React component method, this method runs when the react component is initially rendered
        fetch("http://q7jwz.mocklab.io/json/1") // NOTICE: TEMPORARY API CALL - FORMAT KNOWN JUST BACKEND IS NOT MADE YET
            .then(res => res.json())
            .then(
                (result) => {
                    var menuResult = []; // Variable to store the JSON list as JSON objects in an array

                    for (var currentDish = 0; currentDish < result.length; currentDish++) { // Loop through each JSON object
                        menuResult[currentDish] = result[currentDish]; // Assign the menuitem to result's array element
                    }

                    this.setState({
                        dishList: menuResult
                    });
                });
    }

    render() {
        return (
            // We make a tab wrapper which creates the tabs on the screen and pass the list of dishes
            <TabWrapper className="tabWrapper" dishList={this.state.dishList}></TabWrapper>
        )
    }
}

export default CardController; // Export the class to be used in another class. 
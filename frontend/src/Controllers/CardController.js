import React from 'react';
import TabWrapper from '../MenuComponents/TabWrapper.js';
import MenuFiltering from '../MenuComponents/MenuFiltering.js'

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
        //this.setDishList = this.setDishList.bind(this);
        this.setFilteredDishList = this.setFilteredDishList.bind(this);
        this.setDishList = this.setDishList.bind(this);
    }

    componentDidMount() { // React component method, this method runs when the react component is initially rendered
        fetch("https://flask.team-project.crablab.co/menu/items") 
            .then(res => res.json())
            .then(
                (result) => {
                    var finalResponse = result.result; // The header passed starts with "result"
                    var menuResult = []; // Variable to store the JSON list as JSON objects in an array
                    for (var currentDish = 0; currentDish < finalResponse.length; currentDish++) { // Loop through each JSON object
                        menuResult[currentDish] = finalResponse[currentDish]; // Assign the menuitem to result's array element
                    }

                    this.setState({
                        dishList: menuResult
                    });
                });
    }

    setFilteredDishList(dishListGiven) {
        this.setState ({
            filteredDishList: dishListGiven,
        })
    }
    setDishList(dishListGiven) {
        this.setState ({
            dishList: dishListGiven,
        })
    }

    render() {
        return (
            // We make a tab wrapper which creates the tabs on the screen and pass the list of dishes
            <div className="TabWrapping">
                <TabWrapper basket={this.props.basket} className="tabWrapper" dishList={this.state.dishList}/>
                <MenuFiltering dishList={this.state.dishList} filteredDishList={this.state.filteredDishList}
                               setDishList={this.setDishList} setFilteredDishList={this.setFilteredDishList}
                componentDidMount={this.componentDidMount} originalDishList={this.state.originalDishList}/>
            </div>
        )
    }
}

export default CardController; // Export the class to be used in another class. 
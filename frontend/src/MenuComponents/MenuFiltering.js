import React from 'react';
import { Checkbox } from 'semantic-ui-react';

class MenuFiltering extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceUnder20: false,
            allergyList: [
                {
                    id : 1,
                    name: "nuts",
                    checked : false
                },
                {
                    id : 2,
                    name : "dairy",
                    checked : false
                },
                {
                    id : 3,
                    name : "gluten",
                    checked : false
                }
            ],
        };
        this.menuFilter = this.menuFilter.bind(this);
        this.dishListToDefault = this.dishListToDefault.bind(this);
        this.remove = this.remove.bind(this);
    }

    toggleChecked = (id) => {
        this.setState({ allergyList: this.state.allergyList.map(allergy =>{
            if(allergy.id === id){
                allergy.checked = !allergy.checked
            }

            return allergy;
        })});
    };
    showChecked = () => {
        this.state.allergyList.map(allergy => {
            console.log(allergy.name + ": " + allergy.checked);
        })
    };

    dishListToDefault() { //retrieving the menu list from online again to set the dish list back to main default
        //doing it like this means on filter changes, any menu changes will come into effect
        fetch("https://flask.team-project.crablab.co/menu/items")
            .then(res => res.json())
            .then(
                (result) => {
                    var finalResponse = result.result; // The header passed starts with "result"
                    var menuResult = []; // Variable to store the JSON list as JSON objects in an array
                    for (var currentDish = 0; currentDish < finalResponse.length; currentDish++) { // Loop through each JSON object
                        menuResult[currentDish] = finalResponse[currentDish]; // Assign the menuitem to result's array element
                    }

                    this.props.setDishList(menuResult);
                });
    }

    menuFilter() {
        this.dishListToDefault(); // set dishlist to default
        var tempDishList = this.props.dishList; //set temp variable to dishlist to avoid altering it directly
        alert(this.props.dishList.length); //test to see it gets edited correctly, should always be 8

        if (document.getElementById('priceCheck').checked) { // if the checkbox is checked. this will check through
            //all the boxes once they are all implemented, and filter accordingly
            this.priceUnder20(tempDishList); // filters the given list
        }

        alert(this.props.dishList.length); //test to see if edited correctly, should be whatever length it appears on the website
        this.props.setDishList(tempDishList); // setting the dishlist to the filtered dishlist
    }

    priceUnder20(dishList) {
        var tempDishList = dishList;
        try{
            Object.values(dishList).forEach(dish => { // Loops over each dish in the basket and checks its price
                //for the moment this is temporary just to figure out the logic, and actually making the dishes
                //disappear from the app
                if (dish.itemPrice < 20) { //checks if the dish has a price of above £20
                    //alert("removing ");
                    this.remove(dish, tempDishList); //removing this dish
                }
            });
        } catch (error) {
            console.log(error);
        }
        return dishList
        //this.props.setDishList(tempDishList);
    }

    remove(menuItem, dishList) { //call this method with the menuItem that needs to be removed (from filter) and it will be removed
        // just putting this here to simplify my code and make a start
        var tempMenuItem = dishList[dishList.length - 1];
        dishList[dishList.length - 1] = menuItem;
        dishList[dishList.indexOf(menuItem)] = tempMenuItem; // simple three way swap with a temp variable to move the
        //unwanted item to the end
        dishList.pop(); //removes the unwanted menuItem
        return dishList;
    }

    toggle = () => this.setState({ checked: !this.state.checked })

    /* toggle(stateToToggle) {
        this.setState({stateToToggle: !this.state.stateToToggle});
    } */

    //the button is only temporary it is just there to test that the toggle checked is working

    render() {
        return (
            <div className="filteringItems">
                {/*<button onClick={this.showChecked}>Show checked in console</button> */}
                {/* <AllergyCheckBoxes allergyList={this.state.allergyList} menuFilter={this.menuFilter} toggleChecked={this.toggleChecked}/> */}
                <Checkbox id="priceCheck" label="Price under £20" onClick={this.menuFilter}
                         onChange={this.toggle} checked={this.state.checked}/>
            </div>
        )
    }
}

export default MenuFiltering;
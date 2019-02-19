import React from 'react';
import { Checkbox } from 'semantic-ui-react';

class MenuFiltering extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceUnder20: false,
        };
        this.menuFilter = this.menuFilter.bind(this);
        this.remove = this.remove.bind(this);
    }

    menuFilter() {
        var tempDishList = this.props.defaultList.slice(); //set temp variable to a COPY of dishList, to avoid altering it
        //directly
        if (document.getElementById('priceCheck').checked) { // if the checkbox is checked. this will check through
            //all the boxes once they are all implemented, and filter accordingly
            tempDishList = this.priceUnder20(tempDishList); // filters the given list
        }
        this.props.setDishList(tempDishList); // setting the dishlist to the filtered dishlist
    }

    priceUnder20(dishList) {
        try{
            Object.values(dishList).forEach(dish => { // Loops over each dish in the basket and checks its price
                //for the moment this is temporary just to figure out the logic, and actually making the dishes
                //disappear from the app
                if (dish.itemPrice > 20) { //checks if the dish has a price of above £20
                    //alert("removing ");
                    dishList = this.remove(dish, dishList); //removing this dish
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
import React from 'react';
import {Checkbox, Modal, Button} from 'semantic-ui-react';


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
        if (document.getElementById("priceUnder20").checked) { // if the checkbox is checked. this will check through
            //all the boxes once they are all implemented, and filter accordingly
            tempDishList = this.priceUnder20Filter(tempDishList); // filters the given list
        }
        if (document.getElementById("nuts").checked) {
            this.allergenFilter("nuts", tempDishList)
        }
        if (document.getElementById("egg").checked) {
            this.allergenFilter("egg", tempDishList)
        }
        if (document.getElementById("fish").checked) {
            this.allergenFilter("fish", tempDishList)
        }
        this.props.setDishList(tempDishList); // setting the dishlist to the filtered dishlist
    }

    allergenFilter(allergen, dishList) {
        try {
            Object.values(dishList).forEach(dish => { // Loops over each dish in the basket
                Object.values(dish.allergies).forEach(ingredient => {
                        if (ingredient === "Warning: This food product contains " + allergen + ".") {
                            dishList = this.remove(dish, dishList);
                        }
                    }
                )
            });
        } catch (error) {
            console.log(error);
        }
        return dishList
    }

    priceUnder20Filter(dishList) {
        try {
            Object.values(dishList).forEach(dish => { // Loops over each dish in the basket
                if (dish.itemPrice > 20) { //checks if the dish has a price of above £20
                    //alert("removing ");
                    dishList = this.remove(dish, dishList); //removing this dish
                }
            });
        } catch (error) {
            console.log(error);
        }
        return dishList
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

    render() {
        return (
            
            <Modal trigger={
                <Button className="FilterModalButton" >
                    Menu Filter
                </Button>
            }> {/*Set the trigger to the button*/}
                <Modal.Content>
                <h3>Menu Filter:</h3>
                <Checkbox id="priceUnder20" label="Price under £20" onClick={this.menuFilter}
                          checked={this.state.checked}/>
                <h5>Tick to remove items containing the following: </h5>
                <Checkbox style={{marginRight: "2%"}} id="nuts" label="Nuts" onClick={this.menuFilter}
                          checked={this.state.checked}/>
                <Checkbox style={{marginRight: "2%"}} id="egg" label="Egg" onClick={this.menuFilter}
                          checked={this.state.checked}/>
                <Checkbox style={{marginRight: "2%"}} id="fish" label="Fish" onClick={this.menuFilter}
                          checked={this.state.checked}/>
                </Modal.Content>
            </Modal>
        )
    }
}

export default MenuFiltering;
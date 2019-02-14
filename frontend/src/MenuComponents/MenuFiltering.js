import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import AllergyCheckBoxes from './AllergyCheckboxes';


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
        }
        this.menuFilter = this.menuFilter.bind(this);
        this.remove = this.remove.bind(this);
    }

    toggleChecked = (id) => {
        this.setState({ allergyList: this.state.allergyList.map(allergy =>{
            if(allergy.id === id){
                allergy.checked = !allergy.checked
            }

            return allergy;
        })});
    }
    showChecked = () => {
        this.state.allergyList.map(allergy => {
            console.log(allergy.name + ": " + allergy.checked);
        })
    }

    menuFilter() {
        try{
            Object.values(this.props.dishList).forEach(dish => { // Loops over each dish in the basket and checks its price
                //for the moment this is temporary just to figure out the logic, and actually making the dishes
                //disappear from the app
                if (dish.itemPrice > 20) { //checks if the dish has a price of above £20
                    //alert("removing ");
                    this.remove(dish); //removing this dish
                }
            });
        } catch (error) {
            console.log(error);
        }

        this.props.callFilter(this.props.dishList); //a method in CardController that updates the dishList to be the parameter
        //that it is passed, this updates the dishList in the app to be the one we create with filtering
    }

    remove(menuItem) { //call this method with the menuItem that needs to be removed (from filter) and it will be removed
        // just putting this here to simplify my code and make a start
        var tempDishList = this.props.dishList;
        var tempMenuItem = tempDishList[tempDishList.length - 1];
        tempDishList[tempDishList.length - 1] = menuItem;
        tempDishList[tempDishList.indexOf(menuItem)] = tempMenuItem; // simple three way swap with a temp variable to move the
        //unwanted item to the end
        tempDishList.pop(); //removes the unwanted menuItem
        this.props.dishList = tempDishList;
    }

    /* toggle(stateToToggle) {
        this.setState({stateToToggle: !this.state.stateToToggle});
    } */

    //the button is only temporary it is just there to test that the toggle checked is working

    render() {
        return (
            <div className="filteringItems">
                <button onClick={this.showChecked}>Show checked in console</button>
                <AllergyCheckBoxes allergyList={this.state.allergyList} menuFilter={this.menuFilter} toggleChecked={this.toggleChecked}/>
                <Checkbox className="priceCheck" label="Price under £20" onClick={this.menuFilter}/>
            </div>
        )
    }
}

export default MenuFiltering;
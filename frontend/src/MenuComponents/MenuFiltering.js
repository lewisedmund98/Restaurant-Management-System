import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import AllergyCheckBoxes from './AllergyCheckboxes';


class MenuFiltering extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceUnder20: false,
            allergyList: ["nuts", "dairy", "gluten"],
        }
        this.menuFilter = this.menuFilter.bind(this);
        this.remove = this.remove.bind(this);
    }

    menuFilter() {
        var total = 0;
        try{
            Object.values(this.props.dishList).forEach(dish => { // Loops over each dish in the basket and gets its price
                if (dish.itemPrice > 20) {
                    total += 1;
                }
            });
        } catch (error) {
            console.log(error);
        }
        alert(total);
    }

    remove(menuItem) { //call this method with the menuItem that needs to be removed (from filter) and it will be removed
        // just putting this here to simplify my code and make a start
        var tempDishList = this.props.dishList;
        var tempMenuItem = tempDishList[tempDishList.length - 1];
        tempDishList[tempDishList.length - 1] = menuItem;
        tempDishList[tempDishList.indexOf(menuItem)] = tempMenuItem; // simple three way swap with a temp variable to move the
        //unwanted item to the end
        tempDishList.pop(); //removes the unwanted menuItem
        this.setState({
            dishList: tempDishList,
        });
        alert([this.props.dishList.length]);
    }

    /* toggle(stateToToggle) {
        this.setState({stateToToggle: !this.state.stateToToggle});
    } */

    render() {
        return (
            <div className="filteringItems">
                <AllergyCheckBoxes allergyList={this.state.allergyList} menuFilter={this.menuFilter}/>
                <Checkbox className="priceCheck" label="Price under £20"/>
            </div>
        )
    }
}

export default MenuFiltering;
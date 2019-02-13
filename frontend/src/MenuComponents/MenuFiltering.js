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
        //var tempDishList = this.prop.dishList;
        //var tempMenuItem = tempDishList[tempDishList.length - 1];
        console.log("hello");
        this.remove(this.props.dishList[0]);
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
        this.props.callFilter();
        console.log([this.props.dishList.length]);
    }

    /* toggle(stateToToggle) {
        this.setState({stateToToggle: !this.state.stateToToggle});
    } */

    render() {
        return (
            <div className="filteringItems">
                <AllergyCheckBoxes allergyList={this.state.allergyList} />
                <Checkbox className="priceCheck" label="Price under £20"/>
            </div>
        )
    }
}

export default MenuFiltering;
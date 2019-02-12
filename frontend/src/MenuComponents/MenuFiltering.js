import React from 'react';
import CardController from '../Controllers/CardController.js';
import { Checkbox } from 'semantic-ui-react'


class MenuFiltering extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceUnder20: false,
        }
    }

    filter() {
        //var tempDishList = this.prop.dishList;
        //var tempMenuItem = tempDishList[tempDishList.length - 1];
    }

    remove(menuItem) { //call this method with the menuItem that needs to be removed (from filter) and it will be removed
        // just putting this here to simplify my code and make a start
        var tempDishList = this.prop.dishList;
        var tempMenuItem = tempDishList[tempDishList.length - 1];
        tempDishList[tempDishList.length - 1] = menuItem;
        tempDishList[tempDishList.indexOf(menuItem)] = tempMenuItem; // simple three way swap with a temp variable
        tempDishList.pop(); //removes the unwanted menuItem
        this.setState({
            dishList: tempDishList,
        })
    }

    render() {
        return (
            <div className="filteringItems">
                <Checkbox className="priceCheck" label="Price under £20"/>
            </div>
        )
    }
}

export default MenuFiltering;
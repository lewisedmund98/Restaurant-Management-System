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
        var tempDishList = this.prop.dishList;
        var tempMenuItem = tempDishList[tempDishList.length - 1];
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
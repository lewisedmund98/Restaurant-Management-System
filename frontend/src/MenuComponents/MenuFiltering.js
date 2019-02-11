import React from 'react';
import CardController from '../Controllers/CardController.js';
import { Checkbox } from 'semantic-ui-react'


class MenuFiltering extends React.Component {
    filter() {
        var tempDishList = this.prop.dishList;
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
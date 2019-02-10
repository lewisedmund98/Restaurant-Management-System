import React from 'react';
import CardController from '../Controllers/CardController.js';
import { Checkbox } from 'semantic-ui-react'


class MenuFiltering extends React.Component {
    render() {
        return (
            <Checkbox className="priceCheck" label="Price under £20"/>
        )
    }
}

export default MenuFiltering;
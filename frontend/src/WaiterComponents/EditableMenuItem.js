import React from 'react';
import { List, Image } from 'semantic-ui-react';
/**
 * This is the component to display an editable menu item, the item can either be in the state
 * 
 * "to be disabled" or "to be enabled" and the logic in this class follows that
 * 
 */
export default class EditableMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false // If the current component is in clicked state
        };
        this.updateArray = this.updateArray.bind(this);
    }

    /**
     * When one of the individual menu items are clicked they need to be added.
     * To make this modular, botht he to be enabled and to be disabled items are displayed here
     * 
     * This is why the booleans exist.
     * 
     * @param {the item id from the properties} itemID 
     */
    updateArray(itemID){
        // If it's "currently enabled"
        if(this.props.enable === true){
            if(this.state.clicked === true){ // If it's currently in the clicked state -> Selected
                this.props.addToArray(itemID, false);
            } else {
                this.props.removeFromArray(itemID, false);
            } 
        }
        // If its "to be diabled"
        if(this.props.disable === true){
            if(this.state.clicked === true){ // If it's currently selected by the user
                this.props.addToArray(itemID, true);
            } else {
                this.props.removeFromArray(itemID, true);
            } 
        }
    }

    render() {
        return (
            <List.Item onClick={async () => { // When the item is clicked, it sets the state to the opposite of clicked
                await this.setState({ clicked: !this.state.clicked });
                this.updateArray(this.props.itemID); // Update the array after the click has been occured
            }}>
            {/*When the button is clicked, the state updates and this sohws the colour of the item when clicked*/}
                <List.Content className={this.state.clicked ? "ListItem ListItemActive" : "ListItem ListItemInactive"}>
                    <div className="listItemContent">
                        <Image avatar src={this.props.itemImage}></Image>
                        <h4>{this.props.dishName}</h4> {/*Display the dishName*/}
                    </div>
                </List.Content>
            </List.Item>
        )
    }
} 
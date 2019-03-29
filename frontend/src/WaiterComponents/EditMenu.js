import React from 'react';
import { Button, Modal, List } from 'semantic-ui-react';
import EditableMenuItem from './EditableMenuItem';

/**
 * This is the edit menu class where the logic for editing the menu is held. 
 * This class deals with both the disabled and enabled menu items and thus has logic for either in almost all of
 * the methods. 
 * 
 * The class also pulls the details of the menu's disabled / enabled menu items
 * 
 * This is all then sent into the editable menu item view component. 
 */

export default class EditMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabledItems: [], // The enabled items list (full)
            disabledItems: [], // The disabled items list (full)
            toBeEnabled: [], // The items which are going to be enabled (currently disabled) (subset)
            toBeDisabled: [] // The items which are doging to be disabled (currently enabled) (subset)
        }
        /*
        method binding
        */
        this.pullItems = this.pullItems.bind(this);
        this.pullDisabledItems = this.pullDisabledItems.bind(this);
        this.pullEnabledItems = this.pullEnabledItems.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.mapEnabledItems = this.mapEnabledItems.bind(this);
        this.mapDisabledItems = this.mapDisabledItems.bind(this);
        this.addToArray = this.addToArray.bind(this);
        this.removeFromArray = this.removeFromArray.bind(this);
    }

    componentDidMount() {
        this.pullItems(); // As soon as the component was mounted, pull the items
    }

    /**
     * Makes the requests to pull both the disabled and enabled items.
     */

    async pullItems() {
        await this.pullDisabledItems();
        await this.pullEnabledItems();
    }

    /**
     * Makes the fetch call to pull all of the disabled items. The disabled items are then stored in the
     * state array "disabledItems"
     * 
     * The further methods will interact with this. 
     */

    async pullDisabledItems() {
        await fetch("https://flask.team-project.crablab.co/menu/items/disabled", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ key: "abc123", secret: "def456" }), // pulls the order id from the order ID given
        })
            .then(response => response.json())
            .then(disabledItems => {
                this.setState({
                    disabledItems: disabledItems.result
                })
            })
    }

    /**
     * This method pulls all of the enabled items in the current menu and then stores
     * the JSON result as "enabledItems" in the state
     */

    async pullEnabledItems() {
        await fetch("https://flask.team-project.crablab.co/menu/items/enabled", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ key: "abc123", secret: "def456" }), // pulls the order id from the order ID given
        })
            .then(response => response.json())
            .then(enabledItems => {
                this.setState({
                    enabledItems: enabledItems.result
                })
            })
    }

    /**
     * updateItems is the method which is called when the users clicks on the save button.
     * This method runs some checks on the boolean passed and then builds a JSON object
     * for the data to makes a fetch request to the backend. 
     * 
     * toggles is the JSON object it will make and the boolean value changes depending on which
     * element made the call
     * 
     * @param {a boolean value to indicate whether the button is to enable or not} isEnable 
     */
    async updateItems(isEnable) { // If the menu item is "to be enabled" pass true
        var jsonToggles = [];
        var i = 0;
        if (isEnable) { // Check if enabled
            for (i = 0; i < this.state.toBeEnabled.length; i++) {
                jsonToggles.push({ itemID: parseInt(this.state.toBeEnabled[i]), enabled: true }); // Set enabled to true
            }
        } else {
            for (i = 0; i < this.state.toBeDisabled.length; i++) {
                jsonToggles.push({ itemID: parseInt(this.state.toBeDisabled[i]), enabled: false }); // Set enabled to false
            }
        }
        this.props.addRequest("menu/items/update", { toggles: jsonToggles } , () => {
            this.pullItems(); // Pull the items again as it has changed
        })
        
    }

    /**
     * Maps the currently enabled items to some Editable menu item view.
     * 
     * @param {list of currently enabled items to display} enabledItems 
     */

    mapEnabledItems(enabledItems) {
        var mappedEnabled = enabledItems.map((item) => { // Maps for each item in enabledItems
            return (
                <EditableMenuItem
                    item={item}
                    addToArray={this.addToArray} removeFromArray={this.removeFromArray}
                    enable={true} itemID={item.itemID} dishName={item.itemName} itemImage={item.itemImage}>
                </EditableMenuItem>
            )
        })
        return mappedEnabled;
    }

    /**
     * Maps the currently disabled items to menu items view to be enabled
     * 
     * @param {list of currently disabled items to display} disabledItems 
     */

    mapDisabledItems(disabledItems) {
        var mappedDisabled = disabledItems.map((item) => {
            return (
                <EditableMenuItem
                    item={item}
                    addToArray={this.addToArray} removeFromArray={this.removeFromArray}
                    disable={true} itemID={item.itemID} dishName={item.itemName} itemImage={item.itemImage}>
                </EditableMenuItem>
            )
        })
        return mappedDisabled;
    }

    /**
     * Method runs on click of any of the editable menu items. The click is handled in the
     * "editableMenuItem" class and is then propogating up to this class. 
     * 
     * That method passes whether it is to be Enabled or to be disabled and then it is handled
     * and added to the correct array here.
     * 
     * @param {the item ID to be passed to the update method} itemID 
     * @param {boolean to represent the state of the button being clicked} isEnable 
     * 
     */

    addToArray(itemID, isEnable) {
        if (isEnable) {
            var enabledTemp = this.state.toBeEnabled;
            enabledTemp.push(itemID); // Push to the to be enabled state
            this.setState({
                toBeEnabled: enabledTemp // Set the state
            })
        } else { // If it is "to be disabled"
            var disabledTemp = this.state.toBeDisabled;
            disabledTemp.push(itemID); // Push to the other to be disabled array
            this.setState({
                toBeDisabled: disabledTemp // Reset the state
            })
        }
    }

    /**
     * Method removes an item ID from either one of the 2 arrays, toBeEnabled or toBeDisabled respecitvely.
     * This is because the user can click off of an item. 
     * 
     * @param {the itemID to be removed from the array, will be used to check existance} itemID 
     * @param {boolean to determine which array to be removed from} isEnable 
     */

    removeFromArray(itemID, isEnable) {
        if (isEnable) {
            var enabledTemp = this.state.toBeEnabled;
            var index = enabledTemp.indexOf(itemID); // Gets the position of the item ID in the array
            enabledTemp.splice(index, 1); // Removes the element at the given array position
            this.setState({
                toBeEnabled: enabledTemp
            })
        } else {
            var disabledTemp = this.state.toBeDisabled;
            var disableIndex = disabledTemp.indexOf(itemID); // Get the position of the item ID In the array
            disabledTemp.splice(disableIndex, 1); // Remvoes the element at the given index
            this.setState({
                toBeDisabled: disabledTemp
            })
        }
    }

    render() {
        var enabledItemsMapped;
        var disabledItemsMapped;
        if (this.state.enabledItems) { // Checks whether the list is empty and once it isn't empty map the array
            enabledItemsMapped = this.mapEnabledItems(this.state.enabledItems);
        }
        if (this.state.disabledItems) {
            disabledItemsMapped = this.mapDisabledItems(this.state.disabledItems);
        }
        return (
            <div className="menuEditDiv">
                {/*Set the arrays back to empty if the user closes the page*/}
                <Modal trigger={<Button className="enableMenuItems">Enable Menu Items</Button>} onClose={() => { this.setState({ toBeEnabled: [] }) }}>
                    <Modal.Content>
                        <List divided relaxed>
                            {disabledItemsMapped}
                        </List>

                    </Modal.Content>
                    <Button className="MenuItemsSave" onClick={() => this.updateItems(true)}>Save</Button> {/*Passes true to indicate its to be enabled*/}
                </Modal>
                {/*Set the arrays back to empty if the user closes the page*/}
                <Modal trigger={<Button className="disableMenuItems">Disable Menu Items</Button>} onClose={() => { this.setState({ toBeDisabled: [] }) }}>
                    <Modal.Content>
                        {enabledItemsMapped}
                    </Modal.Content>
                    <Button className="MenuItemsSave" onClick={() => this.updateItems(false)}>Save</Button> {/*Passes false to indicate its to be disabled*/}
                </Modal>
            </div>
        )
    }
}
import React from 'react';
import { Button, Modal, List } from 'semantic-ui-react';
import EditableMenuItem from './EditableMenuItem';

export default class EditMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabledItems: [],
            disabledItems: [],
            toBeEnabled: [],
            toBeDisabled: []
        }
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
        this.pullItems();
    }

    async pullItems() {
        await this.pullDisabledItems();
        await this.pullEnabledItems();
    }

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
                console.log(enabledItems)
                this.setState({
                    enabledItems: enabledItems.result
                })
            })
    }

    async updateItems(isEnable) { // If the menu item is "to be enabled" pass true
        console.log("updating Items");
        if(isEnable){
            console.log(this.state.toBeEnabled);
        } else {
            console.log(this.state.toBeDisabled);
        }
    }

    mapEnabledItems(enabledItems) {
        var mappedEnabled = enabledItems.map((item) => {
            return (
                <EditableMenuItem
                    item={item}
                    addToArray={this.addToArray} removeFromArray={this.removeFromArray}
                    enable={true} itemID={item.itemID} dishName={item.itemName} itemImage={item.itemImage}></EditableMenuItem>
            )
        })
        return mappedEnabled;
    }

    mapDisabledItems(disabledItems) {
        var mappedDisabled = disabledItems.map((item) => {
            return (
                <EditableMenuItem
                    item={item}
                    addToArray={this.addToArray} removeFromArray={this.removeFromArray}
                    disable={true} itemID={item.itemID} dishName={item.itemName} itemImage={item.itemImage}></EditableMenuItem>
            )
        })
        return mappedDisabled;
    }

    addToArray(itemID, isEnable) {
        if (isEnable) {
            var enabledTemp = this.state.toBeEnabled;
            enabledTemp.push(itemID);
            this.setState({
                toBeEnabled: enabledTemp
            })
        } else {
            var disabledTemp = this.state.toBeDisabled;
            disabledTemp.push(itemID);
            this.setState({
                toBeDisabled: disabledTemp
            })
        }
    }

    removeFromArray(itemID, isEnable) {
        if (isEnable) {
            var enabledTemp = this.state.toBeEnabled;
            var index = enabledTemp.indexOf(itemID);
            enabledTemp.splice(index, 1);
            this.setState({
                toBeEnabled: enabledTemp
            })
        } else {
            var disabledTemp = this.state.toBeDisabled;
            var disableIndex = disabledTemp.indexOf(itemID);
            disabledTemp.splice(disableIndex, 1);
            this.setState({
                toBeDisabled: disabledTemp
            })
        }
    }

    render() {
        var enabledItemsMapped;
        var disabledItemsMapped;
        if (this.state.enabledItems) {
            enabledItemsMapped = this.mapEnabledItems(this.state.enabledItems);
        }
        if (this.state.disabledItems) {
            disabledItemsMapped = this.mapDisabledItems(this.state.disabledItems);
        }
        return (
            <div>
                <Modal trigger={<Button>Enable Menu Items</Button>}>
                    <Modal.Content>
                        <List divided relaxed>
                            {disabledItemsMapped}
                        </List>

                    </Modal.Content>
                    <Button onClick={()=> this.updateItems(true)}>Save</Button>
                </Modal>
                <Modal trigger={<Button>Diable Menu Items</Button>}>
                    <Modal.Content>
                        {enabledItemsMapped}
                    </Modal.Content>
                    <Button onClick={()=> this.updateItems(false)}>Save</Button>
                </Modal>
            </div>
        )
    }
}
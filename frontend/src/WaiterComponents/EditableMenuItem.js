import React from 'react';
import { List, Image } from 'semantic-ui-react';

export default class EditableMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        };
        this.updateArray = this.updateArray.bind(this);
    }

    updateArray(itemID){
        // If it's "currently enabled"
        if(this.props.enable === true){
            if(this.state.clicked === true){
                this.props.addToArray(itemID, false);
            } else {
                this.props.removeFromArray(itemID, false);
            } 
        }
        // If its "to be diabled"
        if(this.props.disable === true){
            if(this.state.clicked === true){
                this.props.addToArray(itemID, true);
            } else {
                this.props.removeFromArray(itemID, true);
            } 
        }
    }

    render() {
        return (
            <List.Item onClick={async () => {
                await this.setState({ clicked: !this.state.clicked });
                this.updateArray(this.props.itemID);
            }}>
                <List.Content style={{ backgroundColor: this.state.clicked ? "lime" : "transparent", padding: "20px" }}>
                    <Image avatar src={this.props.itemImage}></Image>
                    <h4>{this.props.dishName}</h4>
                </List.Content>
            </List.Item>
        )
    }
} 
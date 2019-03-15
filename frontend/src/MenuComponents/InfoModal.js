import React from 'react';
import { Modal, Image } from 'semantic-ui-react';

/**
 * The information modal class is used to show the dish information.
 * It has one method which maps the allergy information to list items
 * so that the renderer can list those items.
 * 
 * DishInformation includes: dishCalories and allergyList both found in "props"
 * 
 */
export default class InfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.mapAllergyInformation = this.mapAllergyInformation.bind(this);
    }

    mapAllergyInformation(allergyList) { // Map each allergy to a JSX list item
        //console.log(allergyList);
        var finalAllergyList = [];
        try {
            Object.values(allergyList).forEach(allergy => { // Pulling values as there is no known key
                finalAllergyList.push(<li key={allergy} className="allergy">{allergy}</li>); // Push a react component to the list to render
            });

            return finalAllergyList; // Returning a list of react elements
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        var allergyList = this.mapAllergyInformation(this.props.allergyList);
        return (
            <Modal trigger={this.props.modalTrigger}> {/*Set the trigger to the button*/}
                <Modal.Header style={{textAlign: "center"}}>
                <Image avatar={true} src={this.props.dishImage}></Image> {this.props.dishName} <Image avatar={true} src={this.props.dishImage}></Image>
                </Modal.Header>
                <Modal.Content>
                    <h3>Allergy Information:</h3>

                    <ul className="allergyList">{allergyList}</ul> {/*Render the list of allergies*/}

                    <h3>Calories:</h3>

                    <ul className="caloriesList">{this.props.dishCalories}</ul>
                </Modal.Content>
                
            </Modal>
        )
    }
}
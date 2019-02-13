import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';


class AllergyCheckboxes extends Component{
    render(){
        return this.props.allergyList.map((allergy) =>(
            <Checkbox className="allergyFilter" label={allergy} onChange={this.menuFilter}/>
        ));
    }
}

export default AllergyCheckboxes;
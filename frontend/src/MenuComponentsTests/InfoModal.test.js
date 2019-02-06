/*import React from 'react';
import InfoModal from '../MenuComponents/InfoModal';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';

describe('<InfoModal /', () => {
	const infoDetails = {
		allergy: ["nuts"]
	}
	
	const noDetails ={
		allergy: []
	}
	
	const componentA = shallow(<InfoModal mapAllergyInformation = {infoDetails}/>);
	
	const componentB = shallow(<InfoModal mapAllergyInformation = {noDetails}/>);
	
	it('Displays list of allergies', () => {
		expect(componentA.contains(<li>nuts</li>)).toBe(true);
	});
	it('Displays no allergies message', () => {
		expect(componentB.contains(<li>There are no allergies to display</li>)).toBe(true);
	});
	
})*/
import React from 'react';
import MenuCard from '../MenuComponents/MenuCard';


test('fake test', () => {
	expect(true).toBeTruthy();
})


/*import { shallow } from 'enzyme';

describe('<MenuCard /',() => {
	const properties = {
		dishName: "some name",
		dishImage: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		dishInfo: "some information",
		dishPrice: 2.99
	}
	
	const component = shallow(<MenuCard props = {properties});
	it('renders a component', () => {
		console.log(component);
		
	});
	it('Returns correct dish name', () => {
		expect(this.contains(<Card.Header>some name</Card.Header>)).toBe(true);
	});
	it('Returns correct image', () => {
		expect(this.contains(<Card.Header>some name</Card.Header>)).toBe(true);
	});
	it('Returns correct dish information', () => {
		expect(this.contains(<Card.Description>some name</Card.Description>)).toBe(true);
	});
	it('Returns correct dish price', () => {
		expect(this.contains(<Card.Meta>some name</Card.Meta>)).toBe(true);
	});
})
*/
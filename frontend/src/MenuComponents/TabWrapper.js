import React from 'react';
import { Tab } from 'semantic-ui-react'; // A tab is a selection technique
import CardWrapper from './CardWrapper';

/**
 * The purpose of the tab wrapper class is to render a tab for the menu to be
 * displayed in. 
 * 
 * The tab consists of the: Starters, Mains, Desserts, and Drinks.
 * 
 * The tab takes in the FULL MENU as an array and has some logic to split the menu into
 * individual menu types ie Main dishes. It then assigns those menu items to a corresponding array.
 * 
 * The 4 arrays are made from the full menu and 4 individual card wrappers are created from
 * these arrays as shown in the "createTabs" method.
 */
export default class TabWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.splitDishesIntoTypes = this.splitDishesIntoTypes.bind(this);
        this.createTabs = this.createTabs.bind(this);

        this.mainDishes = []; // Array to hold the JSON main dishes
        this.starterDishes = []; // Array to hold the JSON starter dishes
        this.dessertDishes = []; // Array to hold the JSON dessertDishs
        this.drinks = []; // Array to hold JSON drinks.
    }

    /**
     * This method splits the dishes into their individual types, and then calls the {@method createTabs} to
     * then take the arrays and make tabs from them. 
     * 
     * Splits the "dishType" JSON key to {"Menu", "Starter", "Dessert", "Drink"}
     * 
     * @param {The full list of menu items} dishList 
     */
    splitDishesIntoTypes(dishList) {
        this.mainDishes = [];
        this.starterDishes = []; 
        this.dessertDishes = [];
        this.drinks = []; 
        dishList.forEach(currentDish => { // Loop over each dish in the full menu
            switch (currentDish.itemType.toLowerCase()) { // Check each dishes type
                case "main": this.mainDishes.push(currentDish);
                    break;
                case "starter": this.starterDishes.push(currentDish);
                    break;
                case "dessert": this.dessertDishes.push(currentDish);
                    break;
                case "drink": this.drinks.push(currentDish);
                    break;
                default: console.log("The dish " + currentDish.dishName + "has no type...");

                    break;
            }
        });
        var tabs = this.createTabs(); // Create tabs from the lists that we made by splitting the elements
        return tabs;
    }


    

    /**
     * This method as described takes the arrays from the class and then makes some
     * tabs from them using the array of tabs. It then assigns a card wrapper to them
     * which is rendered as a part of the tabs array. 
     */

    createTabs() {
        try {
            const tabs = [ // This was taken from the semantic UI react documentation for how to make tabs
                {
                    menuItem: 'Starters',
                    render: () => <Tab.Pane> <CardWrapper basket={this.props.basket} dishList={this.starterDishes} /> </Tab.Pane>
                },
                {
                    menuItem: 'Main',
                    render: () => <Tab.Pane> <CardWrapper basket={this.props.basket} dishList={this.mainDishes} /> </Tab.Pane>
                },
                {
                    menuItem: 'Desserts',
                    render: () => <Tab.Pane><CardWrapper basket={this.props.basket} dishList={this.dessertDishes} /></Tab.Pane>
                },
                {
                    menuItem: 'Drinks',
                    render: () => <Tab.Pane><CardWrapper basket={this.props.basket} dishList={this.drinks} /></Tab.Pane>
                },
            ]
            return tabs;
        }
        catch (error) { // Catch usually if the DB fetch went badly and there are no elements
            console.log(error);
        }

    }



    render() {
        var tabs = this.splitDishesIntoTypes(this.props.filteredDishList); // split and create tabs
        return (
            // Render the tab, the tab is singular but the panes allows all of the card wrappers to occur
            <Tab className="menuTabs" menu={{ fluid: true, vertical: true, tabular: true }} panes={tabs} />
        )
    }
}
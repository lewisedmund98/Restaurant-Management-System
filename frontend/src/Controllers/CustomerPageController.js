/**
 * Old Card controller description
 * The Card Controller class is a class which is made to deal with the data that is going to be used in the
 * menu cards. This makes the API call and then stores the data in a state. This state propogates through
 * the program. This means that the properties of CardWrapper and MenuCard update when this updates.
 *
 * This decouples the CardController from the Card wrapper.
 *
 * The CardController calls the TabWrapper and passes in a JSON object array as properties. The logic
 * for how that is handled and rendered is in the TabWrapper class which takes the list and splits it into menu items
 *
 * The controller can be made better by using a thread which updates the API call if the menu changes all
 * of a sudden.
 *
 * CURRENT HIERACHY: CardController -> TabWrapper (Splits into 4 TYPES) -> CardWrapper (Makes 4 of these) ->
 * MenuCard (Takes the items and displays) -> InfoModal (Event from MenuCard)
 *
 * Note: Fetch is an asynchronous call so state must be used and may take a while to update a user PC if it's slow.
 */
import React from 'react';
import CallWaiter from '../MenuComponents/CallWaiter.js';
import '../index.css';
import Basket from '../BasketComponents/Basket.js';
import TabWrapper from '../MenuComponents/TabWrapper.js';
import MenuFiltering from '../MenuComponents/MenuFiltering.js'
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

/**
 * The customer page controller is the main controller for the page with url/customer.
 * It renders in the main container for the customer page in which it shows the menu and and the basket.
 *
 * The card controller shows the Menu cards and the tabs which allow the navigation of the menu
 *
 * The Basket is the basket which shows on the page and then you can view the basket to place an order.
 */

export default class CustomerPageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBasket: [], // Adds a basket array to which I will append menu objects
            orderPlaced: false,
            orderComplete: false,
            orderNumbers: [],
            dishList: [], // Sets the current state variables to contain a dish list. This will be populated by JSON objects
            permDishList: [],
            cookieKey: "myCookie",
            cookieOrderList: []
        };
        this.addToBasket = this.addToBasket.bind(this); // Method to add to the basket.
        this.removeFromBasket = this.removeFromBasket.bind(this);
        this.setOrder = this.setOrder.bind(this);
        this.setDishList = this.setDishList.bind(this);
    }

    componentDidMount() { // React component method, this method runs when the react component is initially rendered
        fetch("https://flask.team-project.crablab.co/menu/items/enabled", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({key: "abc123", secret: "def456"}), // pulls the order id from the order ID given
        })
            .then(res => res.json())
            .then(
                (result) => {
                    var finalResponse = result.result; // The header passed starts with "result"
                    var menuResult = []; // Variable to store the JSON list as JSON objects in an array
                    for (var currentDish = 0; currentDish < finalResponse.length; currentDish++) { // Loop through each JSON object
                        menuResult[currentDish] = finalResponse[currentDish]; // Assign the menuitem to result's array element
                    }

                    console.log(menuResult);

                    this.setState({
                        permDishList: menuResult,
                        dishList: menuResult
                    });
                });
    }

    setDishList(dishListGiven) {
        this.setState({
            dishList: dishListGiven,
        })
    }

    /**
     *
     * @param {The menu item which is added. It is actually the JSON object pulled from the HTTP} addedMenuItem
     */
    addToBasket(addedMenuItem) {
        var tempBasket = this.state.currentBasket; // The reason for this is I cannot directly edit the state
        tempBasket.push(addedMenuItem);
        this.setState({
            currentBasket: tempBasket // I re-assign the basket as I cannot array.push here
        })
    }

    /**
     * This function takes a JSON object for a menu item to remove that item from the array of menu items.
     *
     * @param {the menuItem to remove. This should be in JSON dish format} menuItem
     */

    removeFromBasket(menuItem) {
        var tempBasket = this.state.currentBasket; // The reason for this is I cannot directly edit the state
        var itemSearchIndex = tempBasket.indexOf(menuItem); // Takes the index of the item to remove
        // Perform Swap with arrray elements
        var tempMenuItem = tempBasket[tempBasket.length - 1]; // Last element in temp
        tempBasket[tempBasket.length - 1] = menuItem; // Assigns the last element of the array the item to remove
        tempBasket[itemSearchIndex] = tempMenuItem; // Sets the previous end of array to the removed item position
        tempBasket.pop(); // Removes the unwanted item

        this.setState({
            currentBasket: tempBasket // I re-assign the basket as I cannot array.push here
        })
    }

    CSVToArray(strData, strDelimiter) { // https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );

        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;

        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec(strData)) {
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ) {
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push([]);
            }
            var strMatchedValue;
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[2]) {
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"),
                    "\""
                );
            } else {
                // We found a non-quoted value.
                strMatchedValue = arrMatches[3];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        // Return the parsed data.
        return (arrData);
    }

    setOrder(orderNumber) {
        var tempOrderArray = this.state.orderNumbers; // Adds an order number to the list
        tempOrderArray.push(orderNumber);
        const tempCookieArray = this.state.cookieOrderList;
        tempCookieArray.push(orderNumber.orderID);
        alert(tempCookieArray.length);
        this.setState({
            orderPlaced: true,
            orderNumbers: tempOrderArray,
            cookieOrderList: tempCookieArray
        });
        document.cookie = "orders=" + this.CSVToArray(this.state.cookieOrderList);

        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)orders\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        alert(this.state.cookieOrderList.length);
        alert(cookieValue);
    }

    render() {
        return (
            // We make a tab wrapper which creates the tabs on the screen and pass the list of dishes
            <div className="mainContainer">

                <div style={{textAlign: "right"}}>
                    <CallWaiter></CallWaiter><MenuFiltering defaultList={this.state.permDishList}
                                                            dishList={this.state.dishList}
                                                            setDishList={this.setDishList}/></div>
                <div className="basketAndMenuItems">
                    <div className="basketSide">
                        <Basket setOrder={this.setOrder} onRemove={this.removeFromBasket}
                                dishList={this.state.currentBasket}></Basket>
                        <Link id='linkHereFromForm' to={{
                            pathname: "/customerOrder",
                            state: {orderNumber: this.state.orderNumbers}
                        }}>
                            <Button id="yourOrdersBtn">Your Orders</Button></Link>

                    </div>
                    <div id="ListCards">
                        <div className="TabWrapping">
                            <TabWrapper basket={this.addToBasket} className="tabWrapper"
                                        dishList={this.state.dishList}/>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
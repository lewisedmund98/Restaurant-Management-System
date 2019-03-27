/**
 * Controller class added for customer orders which will be the class which renders everything for
 * the customer order page.
 */
import React from 'react';
import OrderDisplay from '../OrderComponents/OrderDisplay.js';
let requests = require('../Requests');


export default class OrderController extends React.Component {
    constructor(props) {
        super(props);
        this.pullOrderDetails = this.pullOrderDetails.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pollEndpoint = this.pollEndpoint.bind(this);
        this.state = {
            combinedResults: []
        }
        this.pullOrderDetails();
        this.arrayOfOrderDetails = [];
    }

    componentDidMount() {
        this.startTimer(500);
    }

    startTimer(interval) {
        setTimeout(() => {
            this.pollEndpoint();
        }, interval);
    }

    async pollEndpoint() {
        this.pullOrderDetails();
        this.startTimer(2500);
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

    pullOrderDetails() {
        var tempArr = document.cookie.replace(/(?:(?:^|.*;\s*)orders\s*\=\s*([^;]*).*$)|^.*$/, "$1").split(",");
        tempArr.forEach((index) => {
            requests.pullDetails(index) // Pass order ID's
                .then(orderReturn => {
                    requests.getMenuItems(orderReturn.order.items) // Pass Items
                        .then((menuItems) => {
                            var menuItemsArray = [];
                            for (var i = 0; i < menuItems.length; i++) {
                                menuItemsArray.push(menuItems[i].result);
                            }
                            requests.getOrderStatus(index)
                                .then((orderStatus) => {
                                    var menuResponse = { menu: menuItemsArray };
                                    var combinedResult = { ...orderReturn.order, ...menuResponse, ...orderStatus.order };
                                    //var tempResultArr = this.state.combinedResults;
                                    //tempResultArr.push(combinedResult);

                                    this.arrayOfOrderDetails[index] = combinedResult;
                                    if (!this.arrayOfOrderDetails.some(element => element.orderID === combinedResult.orderID)) {
                                        this.arrayOfOrderDetails.push(combinedResult);
                                    }
                                })

                        })
                })
                .catch(error => {
                    console.log("An error has occured " + error);
                })
        });
        // Object.values(this.props.customerOrders.orderNumber).forEach((orderID, index) => {
        // });
        this.setState({
            combinedResult: this.arrayOfOrderDetails
        });
        this.arrayOfOrderDetails = [];
    }



    render() {
        return (
            <OrderDisplay orderDetails={this.state.combinedResult}></OrderDisplay>
        )
    }

}
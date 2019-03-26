// Requests class is one which holds a few functions for making fetch requests for the backend API. These requests handle
// any of the authentication required and all of them don't require to exist within a class for "this.setState"

/**
 * The pull details function takes an orderid and then it returns a json object to which you then have to select
 * ".then(json => ) and then deal with the object." 
 * 
 * The endpoint returns the details for an order, ie who placed the order etc.
 * 
 * The JSON object it returns is information about a single order to which the OrderID was given.
 * @param {The orderID you would like the details for. The order ID will usually be stored in the user cooke} orderID 
 */

export function pullDetails(orderID) {
    return fetch("https://flask.team-project.crablab.co/order/view", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ "id": orderID }), // pulls the order id from the order ID given
    }).then(response => response.json()) // turns response into json
        .catch(error => console.log(error));
}

/**
 * getMenuItems make a HTTP call to the "/menu/item" endpoint. When passed a list of item ID's, example below, the function
 * returns the details for each of the menu items. The details include the dish name, dish image etc. It means that
 * some of the classes and endpoints only need to deal with the ID. 
 * 
 * Example itemList: ["1", "3"] which corresponds to menu item 1 and menu item 3.
 * 
 * @param {pass a list of item ids which the backend will parse. Each menu item is assosiated with and ID} itemList 
 */

export function getMenuItems(itemList) {
    var promiseArr = []; // This is to hold all the promises created by the function
    try {
        for (var j = 0; j < itemList.length; j++) { // Loops over each menu item and makes a request for each
            if (itemList[j] != null) {
                promiseArr.push(fetch("https://flask.team-project.crablab.co/menu/item", { // Adds to promise array, a fetch call
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ id: itemList[j], key: "abc123", secret: "def456" }), // pulls the order id from the order ID given
                })
                    .then(response => response.json())
                    .catch(() => { console.log("Issue") })
                );
            }
        }

        return Promise.all(promiseArr); // Resolves all the promises added at the same time to be parsed

    } catch (error) {
        console.log("An issue occured");
    }
}

/**
 * Gets the order status of the order ID provided. Status includes current state that an order is in.
 * 
 * Calls endpoint "/order/status"
 * 
 * @param {The orderID for which you want the status for} orderID 
 */

export function getOrderStatus(orderID) {
    return fetch("https://flask.team-project.crablab.co/order/status", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ id: orderID }), // pulls the order id from the order ID given
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

/**
 * Gets the customer details, ie customer name, email etc for a given order ID
 * 
 * Calls: "/order/customer"
 * 
 * @param {orderID for which you want the customer details} orderID 
 */
export function getCustomerDetailsFromOrder(orderID) {
    return fetch("https://flask.team-project.crablab.co/order/customer", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ order_id: orderID }),
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

/**
 * Passing this function an orderID will make a call to the backend to cancel that order.
 * 
 * The status of the order is then cancelled and the payments are refunded.
 * 
 * @param {orderID which needs to be cancelled} orderID 
 */

export function cancelOrder(orderID) {
    return fetch("https://flask.team-project.crablab.co/order/cancel", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: orderID })
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            console.log("Cancelling Order : " + orderID + json);
        })

}
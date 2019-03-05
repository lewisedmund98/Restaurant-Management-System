/**
 * The pull details function takes an orderid and then it returns a json object to which you then have to select
 * ".then(json => ) and then deal with the object."
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
    }).then(response => response.json())
        .catch(error => console.log(error));
}

export function getMenuItems(itemList) {
    var promiseArr = [];
    try {
        for (var j = 0; j < itemList.length; j++) {
            if (itemList[j] != null) {
                promiseArr.push(fetch("https://flask.team-project.crablab.co/menu/item", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ id: itemList[j] }), // pulls the order id from the order ID given
                })
                    .then(response => response.json())
                    .catch(() => { console.log("Issue") })
                );
            }
        }

        return Promise.all(promiseArr);

    } catch (error) {
        console.log("An issue occured");
    }
}

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

export function cancelOrder(orderID) {
    // return fetch("URLTOCANCELANORDER", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ id: orderID })
    // })
    //     .then(response => response.json())
    //     .then(json => console.log("Cancelling Order : " + orderID))
    console.log(orderID + "Is being canceled");    
}
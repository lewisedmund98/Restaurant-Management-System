# Backend Endpoints

This is primarily designed as a reference for those looking to interact with the API. It is manually compiled (for now...) and therefore may not be in sync with actual changes if people forget to update it in a PR. 

All parameters are supplied via JSON bodies (POST usually) and the endpoints return JSON bodies in response. 

### Authenticated endpoints

Some endpoints, denoted by a `*` are authenticated. This means they cannot be accessed without a `key` or `secret`. 

When making a request, you need to include structure your main JSON object thus:

```json
{
    "key": "<application_key>", 
    "secret": "<application_secret>",
    "other_value": "test",
    "other_obj" {}
}
```

Some endpoints also require logging in (staff endpoints) and a certain privilage. In order to obtain a one time access token a call to the login endpoint needs to be made. A further request would look thus:

```json
{
    "key": "<application_key>", 
    "secret": "<application_secret>",
    "auth_token": "<authentication_token",
    "id": "<id>",
    "other_value": "test",
    "other_obj" {}
}
```

We really should be sending auth parameters in headers as it causes no end of trouble with attribute name clashes. 

## ping

### /ping 
`GET`
Returns `ping=pong` on success.

```json
{
    "ping":"pong"
}
```

## database

### /database
`GET`
Used for checking the database connection. Not for deployment to production. 

Returns `database` object containing `VERSION()` equivilant to the database version. 

```json
{
    "database":{
        "VERSION()":"8.0.14"
    }
}
```

## `menu`

### /menu/items
`GET` 
Returns an object containing all the known items. 

```json
{
    "result": [
        {
        "allergies": {
        "Egg": "Warning: This food product contains egg.",
        "Fish": "Warning: This food product contains fish."
        },
        "itemCalories": 2000,
        "itemID": "1",
        "itemImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Aguachiles.jpg/180px-Aguachiles.jpg",
        "itemInformation": "Aguachile is a Mexican dish made of shrimp, submerged in liquid seasoned with chili peppers, lime juice, salt, cilantro, and slices of onion.",
        "itemName": "Aguachile",
        "itemPrice": 10.99,
        "itemType": "Main"
        }
    ]
}
```

#### Filtering options available

- `/menu/items/enabled` 
    - Menu items enabled by the waiter 
- `/menu/items/disabled` 
    - Menu items disabled by the waiter

### /menu/items/update* 
`POST`

```json
"toggles": [
    {"itemID": 1, "enabled": true}, 
    {"itemID": 2, "enabled": false}
]
```

Toggles the supplied items to the supplied values. 

### /menu/item/update*
`POST`

```json
"itemID": "1", 
"fields": {
    "itemName": "RandomDish", 
    "itemCalories": 1, 
    "itemPrice": 11.01, 
    "itemType": "Main", 
    "itemInformation": "a random dish", 
    "itemImage": "https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg", 
    "itemEnabled": true
    }
```

Updates an item with the supplied data. You must supply all fields.

### /menu/item
`POST` 

`id=<item_id>`

Returns an item object for a given ID. 

```json
{
    "result":{
        "allergies":{
            "No Allergy":"This food product contains no items that are common allergens."
        },
        "itemCalories":300.0,
        "itemID":"5",
        "itemImage":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Caldo_de_Pollo_%282411932823%29.jpg/220px-Caldo_de_Pollo_%282411932823%29.jpg","itemInformation":"Caldo de pollo is a common Latin American soup that consists of chicken and vegetables. ",
        "itemName":"Caldo de pollo ",
        "itemPrice":10.0,
        "itemType":"Starter"
        }
}
```
## `order`

### /order/create
`POST`

`name=<customer_name>`

`phone=<customer_phone_number>`

`email=<customer_email_address>`

`table=<customer_table_number>`

`items=[<id_of_item_on_order>]`

Creates an unpaid, unconfirmed order and if not exists adds the customer

Returns the order ID
```json
{
    "orderID":"ordercjs3okget0000n0q2kfed7fy3"
}
```
### /order/view
`POST`

`id=<order_id>`

Returns order object for associated ID

```json
{
    "order":{
        "customerID":"customercjs1rj1jx000084ax5jdmyj48",
        "items":["2","4"],
        "orderID":"ordercjs1sk6zd0000adaxgzznu4dh",
        "table":2,
        "timeCreated":1549977460
    }
}
```
### /order/history
`POST`

`id=<order_id>`

Returns object of item history for associated ID. `metafield` contains object of extra information related to the order stage.

```json
{
    "order":[
        {
            "inserted":1549977460,
            "insertionID":"orderhistcjs1sk6zr0001adaxjsm7jxjj",
            "metafield":"{}",
            "orderID":"ordercjs1sk6zd0000adaxgzznu4dh",
            "stage":"created"
        }
    ]
}
```

### /order/status
`POST`

`id=<order_id>`

Returns object of current status for a given order ID. 

```json
{
    "order":{
        "inserted":1549977460,
        "insertionID":"orderhistcjs1sk6zr0001adaxjsm7jxjj",
        "metafield":"{}",
        "orderID":"ordercjs1sk6zd0000adaxgzznu4dh",
        "stage":"created"
    }
}
```
## `orders`
### /orders/list
`GET` 

Returns list of all orders. This endpoint is likely to be deprecated soon in favour of a more controlled and filtered endpoint. 

```json
{
    "orders": [
        {
            "customerID": "customercjs1rj1jx000084ax5jdmyj48",
            "items": [
                null
            ],
            "orderID": "ordercjs1rj1kt000184ax6tauo7b7",
            "table": 2,
            "timeCreated": 1549975727
        },
        {
            "customerID": "customercjs1rj1jx000084ax5jdmyj48",
            "items": [
                "2",
                "4"
            ],
            "orderID": "ordercjs1rwhfi0000c1ax9h6vhiaf",
            "table": 2,
            "timeCreated": 1549976354
        }
    ]
}
```
## `authentication`
### /handle/login *
`POST`

`username=<user_username>`

`password=<user_password>`

Carries out authentication of a user and if authenticated will provide credentials allowing restricted actions to take place. 

```json
{
    "login":{
        "access_token":"access_cjs3p4skg0000n0q25y2aisvu",
        "userID":"asdasd123123"
    }
}
```
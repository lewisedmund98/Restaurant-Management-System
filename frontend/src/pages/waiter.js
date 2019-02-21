/**
 * This is the waiter page. It will call a waiter page controller. The waiter page controller will then call 
 * a waiter ui wrapper which will then map the elements pulled from the controller into lists of UI elements. 
 */

 /**
 *This is the staff page and requires some of the refactoring and some authentication 
 */

import React from 'react';

import '../index.css';
import WaiterPageController from '../WaiterComponents/WaiterPageController.js';

export default class Customer extends React.Component {
    constructor(props){
        super(props);
    }

    
    render() {
        document.title = "Oaxaca Staff";
        return (
            <div>
                <div className="loginContainer">
                    <h1>Staff ID is logged in</h1>
                </div>  
                <div className="orderContainer"> 
                    <WaiterPageController></WaiterPageController>
                </div>
            </div>
        )
    }
}



/**
 * The customer page inital page. This will render the customer page controller which will dael with requests etc
 *  
 */

import React from 'react';
import '../index.css';
import CustomerPageController from '../Controllers/CustomerPageController';

export default class Customer extends React.Component {
    render() {
        document.title = "Oaxaca Customer";
        return (
            <div>
                <div class="topnav">
                    <img class="logo" src="oaxaca_logo.png" alt="Oaxaca Logo" height="150" width="150"/>
            </div>
               <CustomerPageController></CustomerPageController>
            </div>
                    
        )
    }
}



/**
 * The class which is loaded first by react and will be used to put together everything. For now, this class is used
 * to render some of the components while the rest is made to test those components. 
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



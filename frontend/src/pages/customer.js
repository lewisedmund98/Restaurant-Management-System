/**
 * The class which is loaded first by react and will be used to put together everything. For now, this class is used
 * to render some of the components while the rest is made to test those components. 
 */

import React from 'react';
import '../index.css';
import CustomerPageController from '../Controllers/CustomerPageController';
import { Button } from 'semantic-ui-react';

export default class Customer extends React.Component {
    render() {
        document.title = "Oaxaca Customer";
        return (
            <div>
                <div className="ourmenu" id="menuHeading">
                <div className="ourmenuheading">
                    <h1><b><i aria-hidden="true" className="food icon"></i>Our Menu</b></h1>
                </div>
                <div classname="loginContainer"> 
                    <Button>Staff Login</Button>
                </div>
            </div>
               <CustomerPageController></CustomerPageController>
                
            </div>
                    
        )
    }
}



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
                
               <CustomerPageController></CustomerPageController>
                
            </div>
                    
        )
    }
}



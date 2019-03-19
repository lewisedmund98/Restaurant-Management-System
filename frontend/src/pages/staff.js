/**
 *This is the staff page and requires some of the refactoring and some authentication 
 */

import React from 'react';
import {Route, Link} from 'react-router-dom';
import '../index.css';
import StaffPageController from '../Controllers/StaffPageController';

export default class Customer extends React.Component {
    constructor(props){
        super(props);
    }


    
    render() {
        return (
            <div>
                <div class="topnav">
                    <img class="logo" src="oaxaca_logo.png" alt="Oaxaca Logo" height="150" width="150"/>
                </div>
                <div className="staffPageContainer">
                    <h1>Staff Pages</h1>
                    <li>
                        <Link to="/waiter">Waiter Page</Link>
                    </li>
                    <li>
                        <Link to="/kitchen">Kitchen Page</Link>
                    </li>
                </div>  
            </div>
        )
    }
}



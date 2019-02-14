/**
 *This is the staff page and requires some of the refactoring and some authentication 
 */

import React from 'react';

import '../index.css';
import StaffPageController from '../Controllers/StaffPageController';

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
                    <StaffPageController></StaffPageController>
                </div>
            </div>
        )
    }
}



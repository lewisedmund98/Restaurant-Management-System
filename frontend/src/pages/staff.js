/**
 *This is the staff page and requires some of the refactoring and some authentication 
 */

import React from 'react';

import '../index.css';



export default class Customer extends React.Component {
    render() {
        document.title = "Oaxaca Staff";
        return (
            <div>
                <div className="loginContainer">
                    <h1>Staff ID is logged in</h1>
                </div>  
                <div className="orderContainer"> 
                    <h2>Orders are placed here</h2>
                </div>
            </div>
        )
    }
}



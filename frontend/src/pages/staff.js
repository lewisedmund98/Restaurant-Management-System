/**
 *This is the staff page and requires some of the refactoring and some authentication 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import CardController from '../MenuComponents/CardController';


export default class Customer extends React.Component {
    render() {
        document.title = "Oaxaca Staff";
        return (
            <div className="loginContainer">
                <h1>THIS IS THE STAFF PAGE</h1>
            </div>  
        )
    }
}


/**
 * The class which is loaded first by react and will be used to put together everything. For now, this class is used
 * to render some of the components while the rest is made to test those components. 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import CardContoller from './MenuComponents/CardController.js';
import './index.css';


ReactDOM.render(
    <CardContoller/>, // Render a simple controller and let it deal with the data. 
    document.getElementById("ListCards")
); 

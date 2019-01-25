/**
 * The class which is loaded first by react and will be used to put together everything. For now, this class is used
 * to render some of the components while the rest is made to test those components. 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import DishCardTest from './MenuComponents/MenuCard.js';
import './index.css';


ReactDOM.render(
    <DishCardTest dishName="Dish Name Test" dishInfo="This is some information to test the information"
    dishPrice="£Test" dishImage="https://images-gmi-pmc.edge-generalmills.com/0c0d3f02-0bc0-4ca3-ae87-fedb93b745a3.jpg"
    dishId="TestAB123"/>,

    document.getElementById("SingleMenuCardTest")
); 

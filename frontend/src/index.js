/**
 * The class which is loaded first by react and will be used to put together everything. For now, this class is used
 * to render some of the components while the rest is made to test those components. 
 * 
 * The react router is a library in react which allows us to choose what page to display dependant on what
 * is in the URL at the given time. It allows us to do this by passing a path and the component to render.
 * 
 * THE STRUCTURE THAT IS USES IS AS FOLLOWS: The router takes a path and renders either a customer or a staff 
 * component. These components then produce their own "container" div which is added into the root div in the render here
 * 
 * If you want to:
 * 
 * - Add a new path : Copy the route tag with the path and the react component page you want to render
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Customer from './pages/customer.js';
import Waiter from './pages/waiter.js';
import CustomerOrderPage from './pages/customerOrders';
import Kitchen from "./pages/kitchen.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/**
 * The router in this is what is making sure the react knows which page to render based on the current
 * URL. This currently doesn't work for a default "root".
 */
class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <div>
                    <Route path="/customer" component={Customer} />
                    <Route path="/waiter" component={Waiter}/>
                    <Route path="/customerOrder" component={CustomerOrderPage}/>
                        <Route path="/kitchen" component={Kitchen}/>
                    </div>
                </Router>
            </React.Fragment>

        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("contentContainer")
);



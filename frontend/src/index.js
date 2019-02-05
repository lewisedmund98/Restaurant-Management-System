/**
 * The class which is loaded first by react and will be used to put together everything. For now, this class is used
 * to render some of the components while the rest is made to test those components. 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Customer from './pages/customer.js';
import Staff from './pages/staff.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <div>
                    <Route path="/customer" component={Customer} />
                    <Route path="/staff" component={Staff}/>
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



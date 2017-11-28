import React, {Component} from 'react';
import Login from "./Login";
import {Route} from 'react-router-dom'
import NewDashboard from "./NewDashboard";

class App extends Component {
    render() {
        return (
            <main>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={NewDashboard}/>
            </main>
        );
    }
}

export default App;

import React, {Component} from 'react';
import Login from "./Login";
import Dashboard from "./Dashboard";
import {Route} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <main>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
            </main>
        );
    }
}

export default App;

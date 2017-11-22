import React, {Component} from 'react';
import LoginCard from './LoginCard';
import RegisterCard from './RegisterCard';
import {Switch, Route, BrowserRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardName: <LoginCard/>
        }
        this.handler = this.handler.bind(this)
    }

    handler(e) {
        e.preventDefault()
        this.setState({
            cardName: <RegisterCard/>
        })
    }

    render() {
        return (
            <div className="App" style={{width: '100%', height: '100vh'}}>

                {this.state.cardName}

            </div>
        );
    }
}

export default Login;

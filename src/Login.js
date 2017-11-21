import React, { Component } from 'react';
import LoginCard from './LoginCard';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={ }
  }
  render() {
    return (
      <div className="App">
        <LoginCard/>
      </div>
    );
  }
}

export default Login;

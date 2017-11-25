import React, {Component} from 'react';
import LoginCard from './LoginCard';
import RegisterCard from './RegisterCard';
import Grid from 'material-ui/Grid';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisibility: true
        };
        this.showLoginCard = this.showLoginCard.bind(this);
        this.showRegisterCard = this.showRegisterCard.bind(this);
    }

    showRegisterCard() {
        this.setState({
            loginVisibility: false
        });
    };

    showLoginCard() {
        this.setState({
            loginVisibility: true
        });
    };

    render() {
        return (
            <div className="App" style={{width: '100%', height: '100vh'}}>
                <Grid container spacing={24}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs>
                        {this.state.loginVisibility ? <LoginCard visibility={this.showRegisterCard}/> :
                            <RegisterCard visibility={this.showLoginCard}/>}
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Login;

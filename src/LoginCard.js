// @flow weak

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Input, {InputAdornment, InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
};

const centerCardStyle = {
    width: '345px',
    height: '430px',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'auto',
};

class LoginCard extends Component {
    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };
    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    handleClickShowPasssword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false,
        };
    }

    render() {
        return (
            <div>
                <Card raised={true} className="card" style={centerCardStyle}>
                    <CardContent>
                        <Typography type="display1" component="h2" align="center"
                                    style={{marginTop: '40px', marginBottom: '20px', color: '#000'}}>
                            Login
                        </Typography>
                        <TextField
                            id="email"
                            label="Email"
                            className="textField"
                            margin="normal"
                            style={{width: '100%'}}
                        />
                        <FormControl className="formControl" style={{width: '100%'}}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleClickShowPasssword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </CardContent>
                    <div align='center' style={{marginTop: '20px', marginBottom: '20px'}}>
                        <Button raised color="primary" className="button" style={{width: '90%'}}>
                            Login
                        </Button>
                    </div>
                    <div align='center' style={{marginTop: '20px', marginBottom: '20px'}}>
                        <Button dense className="button">
                            Forgot your password?
                        </Button>
                        <Button dense className="button" onClick={this.props.visibility}>
                            Create an account
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(LoginCard);
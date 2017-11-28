// @flow weak

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Input, {InputAdornment, InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Snackbar from 'material-ui/Snackbar';
import fire from './fire';

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
    height: '440px',
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

class RegisterCard extends Component {
    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };
    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    handleClickShowPasssword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    register = () => {
        if (this.state.email.length <= 0) {
            this.setState({emailError: 'A valid email is required', emailErrorStatus: true});
        } else if (!this.validateEmail(this.state.email)) {
            this.setState({emailError: 'A valid email is required', emailErrorStatus: true});
        } else {
            this.setState({emailError: '', emailErrorStatus: false});
        }
        if (this.state.password.length <= 0) {
            this.setState({passwordError: 'A password is required', passwordErrorStatus: true})
        } else if (this.state.password.length <= 5) {
            this.setState({passwordError: 'Password must be at least 6 characters', passwordErrorStatus: true})
        } else {
            this.setState({passwordError: '', passwordErrorStatus: false})
        }
        if (this.state.email.length > 0 && this.validateEmail(this.state.email) && this.state.password.length > 5) {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
                this.setState({open: false, snackbarMessage: ''});
                window.location.assign('/dashboard');
            }.bind(this)).catch(function (error) {
                if (error.code === 'auth/email-already-in-use') {
                    this.setState({
                        snackbarMessage: 'There already exists an account with the given email address',
                        open: true
                    });
                } else if (error.code === 'auth/invalid-email') {
                    this.setState({snackbarMessage: 'Email address is not valid', open: true});
                } else if (error.code === 'auth/operation-not-allowed') {
                    this.setState({snackbarMessage: 'email/password accounts are not enabled', open: true});
                } else if (error.code === 'auth/weak-password') {
                    this.setState({snackbarMessage: 'Password is not strong enough', open: true});
                }
            }.bind(this));
        }
    };
    handleEmailTextFieldChange = email => event => {
        this.setState({
            [email]: event.target.value,
        });
    };
    handlePasswordTextFieldChange = password => event => {
        this.setState({
            [password]: event.target.value,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            emailError: '',
            passwordError: '',
            emailErrorStatus: false,
            passwordErrorStatus: false,
            open: false,
            snackbarMessage: '',
        };
    }

    render() {
        return (
            <div>
                <Card raised={true} className="card" style={centerCardStyle}>
                    <CardContent>
                        <Typography type="display1" component="h2" align="center"
                                    style={{marginTop: '40px', marginBottom: '20px', color: '#000'}}>
                            Register
                        </Typography>
                        <TextField
                            id="email"
                            label="Email"
                            className="textField"
                            margin="normal"
                            onChange={this.handleEmailTextFieldChange('email')}
                            style={{width: '100%'}}
                            helperText={this.state.emailError}
                            error={this.state.emailErrorStatus}
                        />
                        <FormControl className="formControl" style={{width: '100%'}}
                                     error={this.state.passwordErrorStatus}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handlePasswordTextFieldChange('password')}
                                required="true"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleClickShowPasssword}
                                            onMouseDown={this.handleMouseDownPassword}>
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText>{this.state.passwordError}</FormHelperText>
                        </FormControl>
                    </CardContent>
                    <div align='center' style={{marginBottom: '20px'}}>
                        <Button raised color="primary" className="button" style={{width: '90%'}}
                                onClick={this.register}>
                            Register
                        </Button>
                    </div>
                    <div align='center' style={{marginTop: '20px', marginBottom: '20px'}}>
                        <Button dense className="button" onClick={this.props.visibility}>
                            Already have an account?
                        </Button>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.open}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackbarMessage}</span>}
                    />
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(RegisterCard);
// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
};

const centerCardStyle = {
    top: '50%',
    left: '50%',
    position: 'absolute',
    marginTop: '-192.5px',
    marginLeft: '-172.5px',
}

function LoginCard(props) {
    const {classes} = props;
    return (
        <div>
            <Card raised={true} className={classes.card} style={centerCardStyle}>
                <CardContent>
                    <Typography type="display1" component="h2" align="center" style={{marginTop: '40px', marginBottom: '20px', color: '#000'}}>
                        Login
                    </Typography>
                    <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        margin="normal"
                        style={{width: '100%'}}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        style={{width: '100%'}}
                    />
                </CardContent>
                <div align='center' justify='center' style={{marginTop: '20px', marginBottom: '20px'}}>
                    <Button raised color="primary" className={classes.button} style={{width: '90%'}}>
                        Login
                    </Button>
                </div>
                <div align='center' justify='center' style={{marginTop: '20px', marginBottom: '20px'}}>
                    <Button dense className={classes.button}>
                        Forgot your password?
                    </Button>
                    <Button dense className={classes.button} onClick = {this.props.handler}>
                        Create an account
                    </Button>
                </div>
            </Card>
        </div>
    );
}

LoginCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginCard);
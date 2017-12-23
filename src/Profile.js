/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import fire from "./fire";

const styles = theme => ({
    root: {
        width: '100%',
        // height: 430,
        // marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
});

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: fire.auth().currentUser.email,
        };
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root} style={{height: '100vh'}}>
                <main className={classes.content}>
                    <Typography type="display1" gutterBottom>
                        Welcome {this.state.email} to Omkar Electricals
                    </Typography>
                </main>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import CheckboxList from './CheckboxList';

const styles = theme => ({
    root: {
        width: '100%',
        // height: 430,
        // marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
});

class Invoices extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root} style={{height: '100vh'}}>
                <main className={classes.content}>
                    <CheckboxList/>
                </main>
            </div>
        );
    }
}

Invoices.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Invoices);
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import CheckboxList from './CheckboxList';
import fire from './fire'

const styles = theme => ({
    root: {
        width: '100%',
        // height: 430,
        // marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
});

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
        };
    }

    componentDidMount() {
        fire.database().ref('customers').on('value', snapshot => {
            console.log(snapshot.val());
            if (snapshot !== null && snapshot.val() !== null && snapshot.numChildren() > 0) {
                this.setState({customersList: snapshot.val()});
            }
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root} style={{height: '100vh'}}>
                <main className={classes.content}>
                    <CheckboxList listToDisplay={this.state.customersList} addButtonText="Add New Customer"/>
                </main>
            </div>
        );
    }
}

Customers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Customers);
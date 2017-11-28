/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import DashboardCard from './DashboardCard';
import Grid from 'material-ui/Grid';
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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customersCount: '0',
            invoicesCount: '0',
        };
    }

    componentDidMount() {
        fire.database().ref('customers').on('value', snapshot => {
            if (snapshot !== null && snapshot.val() !== null && snapshot.numChildren() > 0) {
                this.setState({customersCount: snapshot.numChildren()});
            }
        });
        fire.database().ref('invoices').on('value', snapshot => {
            if (snapshot !== null && snapshot.val() !== null && snapshot.numChildren() > 0) {
                this.setState({invoicesCount: snapshot.numChildren()});
            }
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root} style={{height: '100vh'}}>
                <main className={classes.content}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <DashboardCard title="Invoices" value={this.state.invoicesCount}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DashboardCard title="Customers" value={this.state.customersCount}/>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
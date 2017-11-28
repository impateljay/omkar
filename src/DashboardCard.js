/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, {CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    demo: {
        background: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});

class DashboardCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid container spacing={24} align='center' justify='center'>
                <Grid item xs={12} md={6}>
                    <Card className={classes.card} raised='true'>
                        <Button className={classes.button} style={{width: '100%'}}>
                            <CardContent>
                                <Typography type="headline" gutterBottom>
                                    {this.props.title}
                                </Typography>
                                <Typography type="display4">
                                    {this.props.value}
                                </Typography>
                            </CardContent>
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

DashboardCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardCard);
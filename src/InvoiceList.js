/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText,} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, {CardContent} from 'material-ui/Card';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    demo: {
        background: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});

function generate(element) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

class InteractiveList extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <Typography type="title" className={classes.title} align='center' justify='center'>
                            Invoive List
                        </Typography>
                        <Grid container spacing={24}>
                            <Grid item xs={12} md={12}>
                                <Card className={classes.card} raised='true'>
                                    <CardContent>
                                        <List>
                                            {generate(
                                                <ListItem button>
                                                    <ListItemText primary="Single-line item"
                                                                  secondary="Secondary text"/>
                                                </ListItem>,
                                            )}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

InteractiveList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveList);
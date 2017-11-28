/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText,} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, {CardContent} from 'material-ui/Card';
import fire from './fire'

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

class CustomerList extends React.Component {
    showCustomersList = () => {
        return this.state.customersList.map(el => {
            return <ListItemText primary={el.customer_name} secondary={el.customer_address}/>
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
        };
        fire.database().ref('customers').on('value', snapshot => {
            // if (snapshot !== null && snapshot.val() !== null && snapshot.numChildren() > 0) {
            this.setState({customersList: Object.values(snapshot.val())});
            // }
            // console.log(this.state.customersList)
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <Typography type="title" className={classes.title} align='center' justify='center'>
                            Customers List
                        </Typography>
                        <Grid container spacing={24}>
                            <Grid item xs={12} md={12}>
                                <Card className={classes.card} raised='true'>
                                    <CardContent>
                                        <List>
                                            {this.state.customersList.map((item) => {
                                                return (<ListItem button><ListItemText
                                                    primary={item.customer_name}
                                                    secondary={item.customer_address}/></ListItem>);
                                            })}
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

CustomerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerList);
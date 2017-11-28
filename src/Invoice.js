/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button'
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';

const drawerWidth = 240;

const styles = theme => ({
    body1: {
        margin: 0,
        padding: 0,
        height: '100%',
    },
    root: {
        width: '100%',
        // height: '100vh',
        // height: 430,
        // marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // height: 'calc(100% - 56px)',
        height: '100%',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            content: {
                // height: 'calc(100% - 64px)',
                height: '100%',
                marginTop: 64,
            },
        },
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
    card: {
        backgroundColor: '#3F51B5',
    },
    'MuiTypography-headline-80': {
        color: '#ffffff !important'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes, theme} = this.props;
        const {anchor, open} = this.state;

        return (
            <div className={classes.root}>
                <h1>Invoice</h1>
                <Dialog open={this.state.openAddInvoiceDialog}
                        onRequestClose={this.handleDialogAddInvoiceRequestClose}>
                    <DialogTitle>Create New Invoice</DialogTitle>
                    <DialogContent>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel htmlFor="age-helper">Select Customer</InputLabel>
                            <Select
                                value={this.state.selectedCustomer}
                                onChange={this.customerSelectionChanged('selectedCustomer')}
                                input={<Input id="age-helper"/>}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.customersList.map((item) => {
                                    return (<MenuItem value={item.customer_name}>
                                        {item.customer_name}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogAddInvoiceRequestClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.createInvoice} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Invoice.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Invoice);
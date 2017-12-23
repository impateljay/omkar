/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';
import Button from 'material-ui/Button';
import Delete from 'material-ui-icons/Delete';
import Add from 'material-ui-icons/Add';
import fire from "./fire";
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import BasicTable from './BasicTable';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        background: theme.palette.background.paper,
    },
    button: {
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    formControl: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        maxWidth: 360,
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CheckboxList extends React.Component {
    handleAddButtonClickOpen = () => {
        if (this.props.addButtonText === 'Create New Invoice') {
            this.handleDialogAddInvoiceClickOpen();
        } else {
            this.handleDialogAddCustomerClickOpen();
        }
    };

    deleteSelected = () => {
        Object.values(this.state.checked).map(value => {
            fire.database().ref('customers').child(value.customer_id).remove();
        });
    };

    handleToggle = value => () => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: Object.values(newChecked),
        });

        if (newChecked.length > 0) {
            this.setState({
                deleteButtonDisabledStatus: false,
            });
        } else {
            this.setState({
                deleteButtonDisabledStatus: true,
            });
        }
    };
    handleCustomerNameTextFieldChange = customerName => event => {
        this.setState({
            [customerName]: event.target.value,
        });
    };
    handleCustomerAddressTextFieldChange = customerAddress => event => {
        this.setState({
            [customerAddress]: event.target.value,
        });
    };
    handleCustomerEmailTextFieldChange = customerEmail => event => {
        this.setState({
            [customerEmail]: event.target.value,
        });
    };
    handleCustomerMobileTextFieldChange = customerMobile => event => {
        this.setState({
            [customerMobile]: event.target.value,
        });
    };
    writeCustomerData = (customerName, customerAddress, customerEmail, customerMobile) => {
        const itemsRef = fire.database().ref('customers');
        let id = itemsRef.push().getKey();
        const item = {
            customer_name: customerName,
            customer_address: customerAddress,
            customer_email: customerEmail,
            customer_mobile: customerMobile,
            customer_id: id,
        };
        itemsRef.child(id).set(item);
    };
    customerSelectionChanged = selectedCustomer => event => {
        this.setState({[selectedCustomer]: event.target.value});
    };
    handleDialogAddInvoiceClickOpen = () => {
        fire.database().ref('customers').on('value', snapshot => {
            if (snapshot !== null && snapshot.val() !== null && snapshot.numChildren() > 0) {
                this.setState({customersList: Object.values(snapshot.val())});
                this.setState({openAddInvoiceDialog: true});
            }
        });
    };
    handleDialogAddCustomerClickOpen = () => {
        this.setState({openAddCustomerDialog: true});
    };
    handleDialogAddCustomerRequestClose = () => {
        this.setState({openAddCustomerDialog: false});
    };
    handleDrawerOpen = () => {
        this.setState({open: true});
    };
    handleDrawerClose = () => {
        this.setState({open: false});
    };
    handleChangeAnchor = event => {
        this.setState({
            anchor: event.target.value,
        });
    };
    handleClose = () => {
        this.setState({openAddInvoiceDialog: false});
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: '',
            deleteButtonDisabledStatus: true,
            open: false,
            anchor: 'left',
            openAddInvoiceDialog: false,
            openAddCustomerDialog: false,
            customerCount: '0',
            customersList: [],
            customerName: '',
            customerAddress: '',
            customerMobile: '',
            customerEmail: '',
            customerNameError: '',
            customerAddressError: '',
            selectedCustomer: '',
        };
        this.handleToggle = this.handleToggle.bind(this);
    }
    createCustomer = () => {
        if (this.state.customerName.length <= 0) {
            this.setState({customerNameError: 'Please enter customer name'});
        } else {
            this.setState({customerNameError: ''});
        }
        if (this.state.customerAddress.length <= 0) {
            this.setState({customerAddressError: 'Please enter customer address'});
        } else {
            this.setState({customerAddressError: ''});
        }
        if (this.state.customerName.length > 0 && this.state.customerAddress.length > 0) {
            this.writeCustomerData(this.state.customerName, this.state.customerAddress, this.state.customerEmail, this.state.customerMobile);
            this.handleDialogAddCustomerRequestClose()
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Button className={classes.button} raised color="primary"
                        onClick={this.handleAddButtonClickOpen}>
                    <Add className={classes.leftIcon}/>
                    {this.props.addButtonText}
                </Button>
                <Button className={classes.button} raised color="accent"
                        disabled={this.state.deleteButtonDisabledStatus} onClick={this.deleteSelected}>
                    <Delete className={classes.leftIcon}/>
                    Delete
                </Button>
                <div className={classes.root}>
                    <div>
                        <List>
                            {Object.values(this.props.listToDisplay).map(value => (
                                <ListItem key={value} dense button onClick={this.handleToggle(value)}
                                          className={classes.listItem}>
                                    <Checkbox checked={this.state.checked.indexOf(value) !== -1} tabIndex={-1}
                                              disableRipple/>
                                    <ListItemText primary={value.customer_name} secondary={value.customer_address}/>
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Comments">
                                            <CommentIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                            }
                        </List>
                        <Dialog open={this.state.openAddCustomerDialog}
                                onRequestClose={this.handleDialogAddCustomerRequestClose}>
                            <DialogTitle>Add New Customer</DialogTitle>
                            <DialogContent>
                                <TextField autoFocus margin="dense" id="name" label="Enter Customer Name *" type="text"
                                           helperText={this.state.customerNameError}
                                           error={this.state.customerNameError.trim() !== ''}
                                           onChange={this.handleCustomerNameTextFieldChange('customerName')} fullWidth/>
                                <TextField margin="dense" id="name" label="Enter Customer Address *" type="text"
                                           helperText={this.state.customerAddressError}
                                           error={this.state.customerAddressError.trim() !== ''}
                                           onChange={this.handleCustomerAddressTextFieldChange('customerAddress')}
                                           fullWidth/>
                                <TextField margin="dense" id="name" label="Enter Customer Email Address" type="email"
                                           onChange={this.handleCustomerEmailTextFieldChange('customerEmail')}
                                           fullWidth/>
                                <TextField margin="dense" id="name" label="Enter Customer Mobile Number" type="tel"
                                           onChange={this.handleCustomerMobileTextFieldChange('customerMobile')}
                                           fullWidth/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleDialogAddCustomerRequestClose}
                                        color="primary">Cancel</Button>
                                <Button onClick={this.createCustomer} color="primary">ADD</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            fullScreen
                            open={this.state.openAddInvoiceDialog}
                            onRequestClose={this.handleClose}
                            transition={Transition}
                        >
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton color="contrast" onClick={this.handleClose} aria-label="Close">
                                        <CloseIcon/>
                                    </IconButton>
                                    <Typography type="title" color="inherit" className={classes.flex}>
                                        Create New Invoice
                                    </Typography>
                                    <Button color="contrast" onClick={this.handleClose}>
                                        save
                                    </Button>
                                </Toolbar>
                            </AppBar>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="customer">Select Customer</InputLabel>
                                <Select value={this.state.selectedCustomer}
                                        onChange={this.customerSelectionChanged('selectedCustomer')}
                                        input={<Input id="customer"/>}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.state.customersList.map((item) => {
                                        return (<MenuItem value={item.customer_name}>
                                            {item.customer_name}</MenuItem>);
                                    })}
                                </Select>
                            </FormControl>
                            <BasicTable/>
                        </Dialog>

                    </div>
                </div>
            </div>
        );
    }
}

CheckboxList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
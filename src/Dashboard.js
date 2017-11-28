/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import {mailFolderListItems, otherMailFolderListItems} from './tileData';
import FloatingActionButtons from './FloatingActionButtons'
import Grid from 'material-ui/Grid';
import Card, {CardContent} from 'material-ui/Card';
import InvoiceList from './InvoiceList';
import CustomerList from './CustomerList';
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import fire from './fire';
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

class Dashboard extends React.Component {
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
    handleDialogAddInvoiceClickOpen = () => {
        this.setState({openAddInvoiceDialog: true});
    };
    handleDialogAddInvoiceRequestClose = () => {
        this.setState({openAddInvoiceDialog: false});
    };
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
    createInvoice = () => {

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
        const item = {
            customer_name: customerName,
            customer_address: customerAddress,
            customer_email: customerEmail,
            customer_mobile: customerMobile,
        };
        itemsRef.push(item);
    };
    customerSelectionChanged = selectedCustomer => event => {
        this.setState({[selectedCustomer]: event.target.value});
    };

    constructor(props) {
        super(props);
        this.state = {
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
    }

    componentDidMount() {
        fire.database().ref('customers').on('value', snapshot => {
            if (snapshot !== null && snapshot.val() !== null && snapshot.numChildren() > 0) {
                this.setState({customerCount: snapshot.numChildren(), customersList: Object.values(snapshot.val())});
            }
        });
    }

    render() {
        const {classes, theme} = this.props;
        const {anchor, open} = this.state;

        const drawer = (
            <Drawer type="persistent" classes={{paper: classes.drawerPaper,}} anchor={anchor} open={open}>
                <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List className={classes.list}>{mailFolderListItems}</List>
                    <Divider/>
                    <List className={classes.list}>{otherMailFolderListItems}</List>
                </div>
            </Drawer>
        );

        let before = null;
        let after = null;

        if (anchor === 'left') {
            before = drawer;
        } else {
            after = drawer;
        }

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                        [classes[`appBarShift-${anchor}`]]: open,
                    })}>
                        <Toolbar disableGutters={!open}>
                            <IconButton color="contrast" aria-label="open drawer" onClick={this.handleDrawerOpen}
                                        className={classNames(classes.menuButton, open && classes.hide)}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" noWrap>Omkar Electricals</Typography>
                        </Toolbar>
                    </AppBar>
                    {before}
                    <main className={classNames(classes.content, classes[`content-${anchor}`], {
                        [classes.contentShift]: open,
                        [classes[`contentShift-${anchor}`]]: open,
                    })}>
                        <Grid container spacing={24} align='center' justify='center'>
                            <Grid item xs={6} md={3}>
                                <Card className={classes.card} raised='true'>
                                    <Button className={classes.button} style={{width: '100%'}}>
                                        <CardContent>
                                            <Typography type="headline" style={{color: '#ffffff'}} gutterBottom>
                                                Invoices
                                            </Typography>
                                            <Typography type="display4" style={{color: '#ffffff'}}>
                                                59
                                            </Typography>
                                        </CardContent>
                                    </Button>
                                </Card>
                                <Button raised color="accent" className={classes.button} style={{width: '100%'}}
                                        onClick={this.handleDialogAddInvoiceClickOpen}>
                                    Create New Invoice
                                </Button>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Card className={classes.card} raised='true'>
                                    <Button className={classes.button} style={{width: '100%'}}>
                                        <CardContent>
                                            <Typography type="headline" style={{color: '#ffffff'}} gutterBottom>
                                                Customers
                                            </Typography>
                                            <Typography type="display4" style={{color: '#ffffff'}}>
                                                {this.state.customerCount}
                                            </Typography>
                                        </CardContent>
                                    </Button>
                                </Card>
                                <Button raised color="accent" className={classes.button} style={{width: '100%'}}
                                        onClick={this.handleDialogAddCustomerClickOpen}>
                                    Add New Customer
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} md={6}>
                                <InvoiceList align='center' justify='center'/>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <CustomerList data={this.state.customersList}/>
                            </Grid>
                        </Grid>
                        <FloatingActionButtons tooltipText='Add Invoice'/>
                        <Dialog open={this.state.openAddCustomerDialog}
                                onRequestClose={this.handleDialogAddCustomerRequestClose}>
                            <DialogTitle>Add New Customer</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter Customer Name *"
                                    type="text"
                                    helperText={this.state.customerNameError}
                                    error={this.state.customerNameError}
                                    onChange={this.handleCustomerNameTextFieldChange('customerName')}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Enter Customer Address *"
                                    type="text"
                                    helperText={this.state.customerAddressError}
                                    error={this.state.customerAddressError}
                                    onChange={this.handleCustomerAddressTextFieldChange('customerAddress')}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Enter Customer Email Address"
                                    type="email"
                                    onChange={this.handleCustomerEmailTextFieldChange('customerEmail')}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Enter Customer Mobile Number"
                                    type="tel"
                                    onChange={this.handleCustomerMobileTextFieldChange('customerMobile')}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleDialogAddCustomerRequestClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.createCustomer} color="primary">
                                    ADD
                                </Button>
                            </DialogActions>
                        </Dialog>
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
                    </main>
                    {after}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Dashboard);
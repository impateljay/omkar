/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, {MenuItem} from 'material-ui/Menu';
import Home from './Home';
import Customers from './Customers';
import Invoices from './Invoices';
import Profile from './Profile';
import HomeIcon from 'material-ui-icons/Home';
import SupervisorAccountIcon from 'material-ui-icons/SupervisorAccount';
import PersonIcon from 'material-ui-icons/Person';
import ReceiptIcon from 'material-ui-icons/Receipt';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
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
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: theme.mixins.toolbar,
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class PermanentDrawer extends React.Component {
    state = {
        anchorEl: null,
        componentToDisplay: <Home/>,
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({anchorEl: null});
    };

    handleDrawerItemCliked = component => event => {
        if (component === 'home') {
            this.setState({
                componentToDisplay: <Home/>
            });
        } else if (component === 'customers') {
            this.setState({
                componentToDisplay: <Customers/>
            });
        } else if (component === 'invoices') {
            this.setState({
                componentToDisplay: <Invoices/>
            });
        } else if (component === 'profile') {
            this.setState({
                componentToDisplay: <Profile/>
            });
        }
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root} style={{height: '100vh'}}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, classes[`appBar-left`])}>
                        <Toolbar>
                            <Typography type="title" color="inherit" style={{width: '95%'}} noWrap>
                                Omkar Electricals
                            </Typography>
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="contrast"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onRequestClose={this.handleRequestClose}
                                >
                                    <MenuItem onClick={this.handleRequestClose}>View Profile</MenuItem>
                                    <MenuItem onClick={this.handleRequestClose}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        type="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        <div className={classes.drawerHeader}/>
                        <Divider/>
                        <List>
                            <div>
                                <ListItem button onClick={this.handleDrawerItemCliked('home')}>
                                    <ListItemIcon>
                                        <HomeIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Home"/>
                                </ListItem>
                                <ListItem button onClick={this.handleDrawerItemCliked('customers')}>
                                    <ListItemIcon>
                                        <SupervisorAccountIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Customers"/>
                                </ListItem>
                                <ListItem button onClick={this.handleDrawerItemCliked('invoices')}>
                                    <ListItemIcon>
                                        <ReceiptIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Invoices"/>
                                </ListItem>
                                <ListItem button onClick={this.handleDrawerItemCliked('profile')}>
                                    <ListItemIcon>
                                        <PersonIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Profile"/>
                                </ListItem>
                            </div>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        {this.state.componentToDisplay}
                    </main>
                </div>
            </div>
        );
    }
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
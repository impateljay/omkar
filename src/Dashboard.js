/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import FloatingActionButtons from './FloatingActionButtons'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import InvoiceList from './InvoiceList';
import './Dashboard.css';

const drawerWidth = 240;

const styles = theme => ({
  body1:{
    margin:0,
    padding:0,
    height:'100%',
  },
  root: {
    width: '100%',
    height: '100vh',
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
    height:'100%',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        // height: 'calc(100% - 64px)',
        height:'100%',
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
  }
});

class Dashboard extends React.Component {
  state = {
    open: false,
    anchor: 'left',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer type="persistent" classes={{paper: classes.drawerPaper,}} anchor={anchor} open={open} >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>{mailFolderListItems}</List>
          <Divider />
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
          <AppBar className={classNames(classes.appBar, {[classes.appBarShift]: open, [classes[`appBarShift-${anchor}`]]: open,})}>
            <Toolbar disableGutters={!open}>
              <IconButton color="contrast" aria-label="open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide)} >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>Omkar Electricals</Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main className={classNames(classes.content, classes[`content-${anchor}`], {[classes.contentShift]: open, [classes[`contentShift-${anchor}`]]: open,})}>
            <Grid container spacing={24} align='center' justify='center'>
              <Grid item xs={6} md={3}>
                <Card className={classes.card} raised='true'>
                  <CardContent>
                    <Typography type="headline" style={{color: '#ffffff'}} gutterBottom>
                      Invoices
                    </Typography>
                    <Typography type="display4" style={{color: '#ffffff'}}>
                      59
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card className={classes.card} raised='true'>
                  <CardContent>
                    <Typography type="headline" style={{color: '#ffffff'}} gutterBottom>
                      Customers
                    </Typography>
                    <Typography type="display4" style={{color: '#ffffff'}}>
                      20
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <InvoiceList align='center' justify='center'/>
            <FloatingActionButtons tooltipText='Add Invoice'/>
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

export default withStyles(styles, { withTheme: true })(Dashboard);
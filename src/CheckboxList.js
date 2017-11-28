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
});

class CheckboxList extends React.Component {
    deleteSelected = () => {
        //TODO
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

    constructor(props) {
        super(props);
        this.state = {
            checked: '',
            deleteButtonDisabledStatus: true,
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Button className={classes.button} raised color="primary">
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
                            {this.props.listToDisplay.map(value => (
                                <ListItem
                                    key={value}
                                    dense
                                    button
                                    onClick={this.handleToggle(value)}
                                    className={classes.listItem}
                                >
                                    <Checkbox
                                        checked={this.state.checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                    <ListItemText primary={value.customer_name}
                                                  secondary={value.customer_address}/>
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Comments">
                                            <CommentIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
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
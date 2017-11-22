// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        float: 'right',
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
});

function FloatingActionButtons(props) {
    const {classes} = props;
    return (
        <div>
            <Tooltip placement="top" title={props.tooltipText}>
                <Button fab color="accent" aria-label="add" className={classes.button}>
                    <AddIcon/>
                </Button>
            </Tooltip>
        </div>
    );
}

FloatingActionButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
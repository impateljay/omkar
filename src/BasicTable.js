/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        width: '100%',
    },
});

let id = 0;

function createEmptyRow() {
    id += 1;
    return {id: id, item: '', unit: '', quantity: '', rate: '', gst: '', amount: 0};
}

class BasicTable extends React.Component {
    handleChangeItem = id => event => {
        this.setState({
            data: this.state.data.map(
                (el) => el.id === id ? Object.assign({}, el, {item: event.target.value}) : el)
        });
    };
    handleChangeUnit = id => event => {
        this.setState({
            data: this.state.data.map(
                (el) => el.id === id ? Object.assign({}, el, {unit: event.target.value}) : el)
        });
    };
    handleChangeQuantity = id => event => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        this.state.data.findIndex(data => this.state.data.map((el) => {
            if (el.id === id) {
                if (event.target.value.trim() === '' || el.rate.trim() === '' || el.gst.trim() === '') {
                    this.setState({
                        data: this.state.data.map(
                            (el) => el.id === id ? Object.assign({}, el, {
                                quantity: event.target.value,
                                amount: 0
                            }) : el)
                    });
                    let total = 0;
                    let totals = this.state.data.map(
                        (el) => {
                            if (el.id === id) {
                                total = parseFloat(total);
                            } else {
                                total = parseFloat(total) + parseFloat(el.amount);
                            }
                            return total;
                        });
                    let a = totals + '';
                    let b = a.split(',');
                    this.setState({
                        total: parseFloat(b[b.length - 1]).toFixed(2)
                    });
                } else {
                    this.setState({
                        data: this.state.data.map(
                            (el) => el.id === id ? Object.assign({}, el, {
                                quantity: event.target.value,
                                amount: (event.target.value * el.rate + ((event.target.value * el.rate * el.gst) / 100)).toFixed(2)
                            }) : el)
                    });
                    let total = 0;
                    let totals = this.state.data.map(
                        (el) => {
                            if (el.id === id) {
                                total = parseFloat(total) + parseFloat(event.target.value) * parseFloat(el.rate) + ((event.target.value * el.rate * el.gst) / 100);
                            } else {
                                total = parseFloat(total) + parseFloat(el.amount);
                            }
                            return total;
                        });
                    let a = totals + '';
                    let b = a.split(',');
                    this.setState({
                        total: parseFloat(b[b.length - 1]).toFixed(2)
                    });
                }
            }
        }));
    };
    handleChangeRate = id => event => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        this.state.data.findIndex(data => this.state.data.map((el) => {
            if (el.id === id) {
                if (el.quantity.trim() === '' || event.target.value.trim() === '' || el.gst.trim() === '') {
                    this.setState({
                        data: this.state.data.map(
                            (el) => el.id === id ? Object.assign({}, el, {rate: event.target.value, amount: 0}) : el)
                    });
                    let total = 0;
                    let totals = this.state.data.map(
                        (el) => {
                            if (el.id === id) {
                                total = parseFloat(total);
                            } else {
                                total = parseFloat(total) + parseFloat(el.amount);
                            }
                            return total;
                        });
                    let a = totals + '';
                    let b = a.split(',');
                    this.setState({
                        total: parseFloat(b[b.length - 1]).toFixed(2)
                    });
                } else {
                    this.setState({
                        data: this.state.data.map(
                            (el) => el.id === id ? Object.assign({}, el, {
                                rate: event.target.value,
                                amount: (el.quantity * event.target.value + ((el.quantity * event.target.value * el.gst) / 100)).toFixed(2)
                            }) : el)
                    });
                    let total = 0;
                    let totals = this.state.data.map(
                        (el) => {
                            if (el.id === id) {
                                total = parseFloat(total) + parseFloat(el.quantity) * parseFloat(event.target.value) + ((el.quantity * event.target.value * el.gst) / 100);
                            } else {
                                total = parseFloat(total) + parseFloat(el.amount);
                            }
                            return total;
                        });
                    let a = totals + '';
                    let b = a.split(',');
                    this.setState({
                        total: parseFloat(b[b.length - 1]).toFixed(2)
                    });
                }
            }
        }));
    };
    handleChangeGST = id => event => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        this.state.data.findIndex(data => this.state.data.map((el) => {
            if (el.id === id) {
                if (el.quantity.trim() === '' || el.rate.trim() === '' || event.target.value.trim() === '') {
                    this.setState({
                        data: this.state.data.map(
                            (el) => el.id === id ? Object.assign({}, el, {gst: event.target.value, amount: 0}) : el)
                    });
                    let total = 0;
                    let totals = this.state.data.map(
                        (el) => {
                            if (el.id === id) {
                                total = parseFloat(total);
                            } else {
                                total = parseFloat(total) + parseFloat(el.amount);
                            }
                            return total;
                        });
                    let a = totals + '';
                    let b = a.split(',');
                    this.setState({
                        total: parseFloat(b[b.length - 1]).toFixed(2)
                    });
                } else {
                    this.setState({
                        data: this.state.data.map(
                            (el) => el.id === id ? Object.assign({}, el, {
                                gst: event.target.value,
                                amount: (el.quantity * el.rate + ((el.quantity * el.rate * event.target.value) / 100)).toFixed(2)
                            }) : el)
                    });
                    let total = 0;
                    let totals = this.state.data.map(
                        (el) => {
                            if (el.id === id) {
                                total = parseFloat(total) + parseFloat(el.quantity) * parseFloat(el.rate) + ((el.quantity * el.rate * event.target.value) / 100);
                            } else {
                                total = parseFloat(total) + parseFloat(el.amount);
                            }
                            return total;
                        });
                    let a = totals + '';
                    let b = a.split(',');
                    this.setState({
                        total: parseFloat(b[b.length - 1]).toFixed(2)
                    });
                }
            }
        }));
    };
    handleDelete = id => event => {
        let datas = this.state.data.filter(function (data) {
            return data.id !== id
        });
        this.setState({data: datas});
        let total = 0;
        let totals = this.state.data.map(
            (el) => {
                if (el.id === id) {
                    total = parseFloat(total);
                } else {
                    total = parseFloat(total) + parseFloat(el.amount);
                }
                return total;
            });
        let a = totals + '';
        let b = a.split(',');
        this.setState({
            total: parseFloat(b[b.length - 1]).toFixed(2)
        });
    };
    addNewRow = id => event => {
        let newArray = this.state.data.concat(createEmptyRow());
        this.setState({data: newArray});
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [createEmptyRow()],
            total: '0',
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table} fullWidth>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell numeric style={{width: 60}}>Unit</TableCell>
                            <TableCell numeric style={{width: 60}}>Quantity</TableCell>
                            <TableCell numeric style={{width: 80}}>Rate(Rs)</TableCell>
                            <TableCell numeric style={{width: 60}}>GST(%)</TableCell>
                            <TableCell numeric style={{width: 100}}>Amount(Rs)</TableCell>
                            <TableCell numeric style={{width: 50}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(n => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell>
                                        <TextField
                                            id="item"
                                            className={classes.textField}
                                            value={n.item}
                                            onChange={this.handleChangeItem(n.id)}
                                            margin="normal"
                                            fullWidth/>
                                    </TableCell>
                                    <TableCell numeric style={{width: 60}}>
                                        <TextField
                                            id="unit"
                                            className={classes.textField}
                                            value={n.unit}
                                            onChange={this.handleChangeUnit(n.id)}
                                            margin="normal"
                                            fullWidth/>
                                    </TableCell>
                                    <TableCell numeric style={{width: 60}}>
                                        <TextField
                                            id="quantity"
                                            className={classes.textField}
                                            value={n.quantity}
                                            onChange={this.handleChangeQuantity(n.id)}
                                            margin="normal"
                                            fullWidth/>
                                    </TableCell>
                                    <TableCell numeric style={{width: 80}}>
                                        <TextField
                                            id="rate"
                                            className={classes.textField}
                                            value={n.rate}
                                            onChange={this.handleChangeRate(n.id)}
                                            margin="normal"
                                            fullWidth/>
                                    </TableCell>
                                    <TableCell numeric style={{width: 60}}>
                                        <TextField
                                            id="gst"
                                            className={classes.textField}
                                            value={n.gst}
                                            onChange={this.handleChangeGST(n.id)}
                                            margin="normal"
                                            fullWidth/>
                                    </TableCell>
                                    <TableCell numeric style={{width: 50}}>
                                        {n.amount}
                                    </TableCell>
                                    <TableCell numeric style={{width: 50}}>
                                        <IconButton className={classes.button} aria-label="Delete"
                                                    onClick={this.handleDelete(n.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                            );
                        })}
                    </TableBody>
                </Table>
                <Button raised color="accent" className={classes.button} onClick={this.addNewRow(1)}>
                    Add Item
                </Button>
                <Table className={classes.table} fullWidth>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell style={{width: 60}}></TableCell>
                            <TableCell style={{width: 80}}></TableCell>
                            <TableCell style={{width: 60}}>
                                <Typography type="body1" gutterBottom align="right">
                                    Total
                                </Typography>
                            </TableCell>
                            <TableCell style={{width: 100}}>
                                <Typography type="body1" gutterBottom align="right">
                                    {this.state.total}
                                </Typography>
                            </TableCell>
                            <TableCell style={{width: 50}}>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </Paper>
        );
    }
}

BasicTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);
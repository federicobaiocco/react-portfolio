import React, {Component} from 'react';
import './style.css';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CustomizedSnackbars from '../Snackbar/Snackbar';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

class DegreesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
        };
        this.createNewDegree = this.createNewDegree.bind(this);
    }

    createNewDegree(event) {
        event.preventDefault();
        const formValues = {
            name: event.target.elements.name.value,
            description: event.target.elements.description.value,
            endDate: this.state.selectedDate
        };
        if(formValues.name.length === 0 || formValues.description.length === 0 || !this.state.selectedDate){
            this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: 'Please, complete all the required fields', variant: 'error'}})
        } else {
            axios.post('http://localhost:8080/degree', formValues).then( res => {
                if(res.status === 201) {
                    this.showSnackBar('Degree created successfully');
                    document.getElementById('newDegreesForm').reset();
                    this.setState({selectedDate: null});
                    this.props.dispatch({type: 'ADD_DEGREE', payload: res.data});
                    this.cancel();
                }
            });
        }
    }

    cancel() {
        this.props.dispatch({type: 'HIDE_DEGREES_FORM'});
    }

    showSnackBar(message) {
        this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: message, variant: 'success'}});
    }

    closeSnackbar() {
        this.props.dispatch({type: 'HIDE_SNACKBAR'});
    }

    handleDateChange(date){
        this.setState({selectedDate: date});
    };

    render() {
        return (
            <div style={{display: this.props.degreesForm.show? 'block': 'none'}}>
                <form id='newDegreesForm' onSubmit={this.createNewDegree} noValidate className='form-container' autoComplete="off">
                    <h4 style={{textAlign: 'center'}}>Add degree</h4>
                    <div>
                        <TextField
                            label="Name"
                            name='name'
                            required={true}
                            style={{width: '100%'}}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Description"
                            name='description'
                            required={true}
                            style={{width: '100%'}}
                        />
                    </div>
                    <div className='fullWidth'>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{width: '100%'}}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Graduation date"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange.bind(this)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.cancel.bind(this)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="secondary" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
                <CustomizedSnackbars closeIt={this.closeSnackbar.bind(this)} variant={this.props.snackBar.snackbarVariant} message={this.props.snackBar.snackbarMessage} open={this.props.snackBar.showSnackBar}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        degreesForm: state.degreesForm,
        snackBar: state.snackBar
    };
};
export default connect(mapStateToProps)(DegreesForm);

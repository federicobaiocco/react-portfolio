import React, {Component} from 'react';
import './style.css';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CustomizedSnackbars from '../Snackbar/Snackbar';

class ExperiencesForm extends Component {
    constructor(props) {
        super(props);
        this.createNewExperience = this.createNewExperience.bind(this);
    }

    createNewExperience(event) {
        event.preventDefault();
        const formValues = {
            name: event.target.elements.name.value,
            image: event.target.elements.img.value,
            description: event.target.elements.description.value
        };
        if(formValues.name.length === 0 || formValues.image.length === 0 || formValues.description.length === 0){
            this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: 'Por favor complete todos los datos del formulario', variant: 'error'}})
        } else {
            axios.post('http://localhost:8080/experience', formValues).then( res => {
                if(res.status === 201) {
                    this.showSnackBar('Experiencia creada con éxito');
                    document.getElementById('newExperiencesForm').reset();
                }
            });
        }
    }

    cancel() {
        this.props.dispatch({type: 'HIDE_EXPERIENCES_FORM'});
    }

    showSnackBar(message) {
        this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: message, variant: 'success'}});
    }

    closeSnackbar() {
        this.props.dispatch({type: 'HIDE_SNACKBAR'});
    }

    render() {
        return (
            <div style={{display: this.props.experiencesForm.show? 'block': 'none'}}>
                <form id='newExperiencesForm' onSubmit={this.createNewExperience} className='form-container' noValidate autoComplete="off">
                    <h4 style={{textAlign: 'center'}}>Add experience</h4>
                    <TextField
                        label="Name"
                        name='name'
                        required={true}
                        style={{width: '100%'}}
                    />
                    <TextField
                        label="Image URL"
                        name='img'
                        required={true}
                        style={{width: '100%'}}
                    />
                    <TextField
                        label="Description"
                        name='description'
                        required={true}
                        style={{width: '100%'}}
                    />
                    <Button variant="contained" color="primary" onClick={this.cancel.bind(this)}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" type="submit">
                        Save
                    </Button>
                </form>
                <CustomizedSnackbars closeIt={this.closeSnackbar.bind(this)} variant={this.props.snackBar.snackbarVariant} message={this.props.snackBar.snackbarMessage} open={this.props.snackBar.showSnackBar}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        experiencesForm: state.experiencesForm,
        snackBar: state.snackBar
    };
};
export default connect(mapStateToProps)(ExperiencesForm);

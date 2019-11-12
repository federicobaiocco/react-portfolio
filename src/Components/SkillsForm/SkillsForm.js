import React, {Component} from 'react';
import './style.css';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CustomizedSnackbars from '../Snackbar/Snackbar';

class SkillsForm extends Component {
    constructor(props) {
        super(props);
        this.createNewSkill = this.createNewSkill.bind(this);
    }

    createNewSkill(event) {
        event.preventDefault();
        const formValues = {
            name: event.target.elements.name.value,
            percentage: event.target.elements.percentage.value
        };
        if(formValues.name.length === 0 || formValues.percentage.length === 0){
            this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: 'Please, complete all the required fields', variant: 'error'}})
        } else {
            axios.post('http://localhost:8080/skill', formValues).then( res => {
                if(res.status === 201) {
                    this.showSnackBar('Skill created successfully');
                    document.getElementById('newSkillsForm').reset();
                    this.props.dispatch({type: 'ADD_SKILL', payload: res.data});
                    this.cancel();
                }
            });
        }
    }

    cancel() {
        this.props.dispatch({type: 'HIDE_SKILLS_FORM'});
    }

    showSnackBar(message) {
        this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: message, variant: 'success'}});
    }

    closeSnackbar() {
        this.props.dispatch({type: 'HIDE_SNACKBAR'});
    }

    render() {
        return (
            <div style={{display: this.props.skillsForm.show? 'block': 'none'}}>
                <form id='newSkillsForm' onSubmit={this.createNewSkill} noValidate className='form-container' autoComplete="off">
                    <h4 style={{textAlign: 'center'}}>Add skill</h4>
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
                            label="Percentage"
                            name='percentage'
                            required={true}
                            style={{width: '100%'}}
                        />
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
        skillsForm: state.skillsForm,
        snackBar: state.snackBar
    };
};
export default connect(mapStateToProps)(SkillsForm);

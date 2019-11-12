import React, {Component} from 'react';
import './style.css';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CustomizedSnackbars from '../Snackbar/Snackbar';
import firebase from 'firebase';
import LinearProgress from '@material-ui/core/LinearProgress';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "digipos-images.firebaseapp.com",
    databaseURL: "https://digipos-images.firebaseio.com",
    projectId: "digipos-images",
    storageBucket: "digipos-images.appspot.com",
    messagingSenderId: "515250730298",
    appId: "1:515250730298:web:8efdd3487d1c0f5a4bcc03"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class ExperiencesForm extends Component {
    constructor(props) {
        super(props);
        this.createNewExperience = this.createNewExperience.bind(this);
        this.state = {
            uploadValue: 0,
            img: '',
            showProgress: false
        }
    }

    createNewExperience(event) {
        event.preventDefault();
        const formValues = {
            name: event.target.elements.name.value,
            image: this.state.img,
            description: event.target.elements.description.value
        };
        if(formValues.name.length === 0 || this.state.img === '' || formValues.description.length === 0){
            this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: 'Please, complete all the required fields', variant: 'error'}})
        } else {
            axios.post('http://localhost:8080/experience', formValues).then( res => {
                if(res.status === 201) {
                    this.showSnackBar('Experiencie created successfully');
                    document.getElementById('newExperiencesForm').reset();
                    this.setState({showProgress: false, uploadValue: 0});
                    this.props.dispatch({type: 'ADD_EXPERIENCE', payload: res.data});
                    this.cancel();
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

    handleImageUpload(event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`pictures/${file.name}`);
        const task = storageRef.put(file);

        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                showProgress: true,
                uploadValue: percentage
            });
        }, (error) => {
            console.error(error.message);
        }, () => {
            task.snapshot.ref.getDownloadURL().then(url=>{
                console.log('upload complete', url);
                this.setState({
                    img: url
                })
            });
        })
    }

    render() {
        return (
            <div style={{display: this.props.experiencesForm.show? 'block': 'none'}}>
                <form id='newExperiencesForm' onSubmit={this.createNewExperience} className='form-container' noValidate autoComplete="off">
                    <h4 style={{textAlign: 'center'}}>Add experience</h4>
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
                    <div style={{marginTop: '15px'}}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            required={true}
                            onChange={this.handleImageUpload.bind(this)}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span">
                                Upload image
                            </Button>
                        </label>
                        <LinearProgress style={{marginTop:'15px', display: this.state.showProgress? 'block':'none'}} variant="determinate" value={this.state.uploadValue} />
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
        experiencesForm: state.experiencesForm,
        snackBar: state.snackBar
    };
};
export default connect(mapStateToProps)(ExperiencesForm);

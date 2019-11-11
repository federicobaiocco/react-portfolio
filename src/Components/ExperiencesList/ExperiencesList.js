import React, {Component} from 'react';
import './style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";
import axios from "axios/index";
import CustomizedSnackbars from '../Snackbar/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ExperiencesForm from '../ExperiencesForm/ExperiencesForm';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';

class ExperiencesList extends Component {
    componentDidMount() {
        axios.get('http://localhost:8080/experiences').then(res => {
            this.props.dispatch({type: 'SET_EXPERIENCES', payload: res.data})
        });
    }

    deleteExperience(experience) {
        console.log(experience)
    }

    showSnackBar(message) {
        this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: message, variant: 'success'}});
    }

    closeSnackbar() {
        this.props.dispatch({type: 'HIDE_SNACKBAR'});
    }

    showExperiencesForm() {
        this.props.dispatch({type: 'SHOW_EXPERIENCES_FORM'});
    }
    render() {
        return (
            <div>
                <div className='list-container' style={{display: !this.props.experiencesForm.show? 'block': 'none'}}>
                    <h4 style={{textAlign: 'center'}}>Experiences</h4>
                    <div className='experiences'>
                        <List className='list'>
                            {this.props.experiences.map((experience) => (
                                <ListItem key={experience._id} className='list-item'>
                                    <ListItemIcon>
                                        <BookmarkRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={experience.name}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={this.deleteExperience.bind(this, experience)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <div style={{textAlign:'right', marginTop: '15px'}}>
                        <Tooltip title="Add" aria-label="add">
                            <Fab color="secondary" onClick={this.showExperiencesForm.bind(this)}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </div>
                </div>

                <ExperiencesForm/>
                <CustomizedSnackbars closeIt={this.closeSnackbar.bind(this)} variant={this.props.snackBar.snackbarVariant} message={this.props.snackBar.snackbarMessage} open={this.props.snackBar.showSnackBar}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        experiences: state.experiences,
        snackBar: state.snackBar,
        experiencesForm: state.experiencesForm
    };
};
export default connect(mapStateToProps)(ExperiencesList);
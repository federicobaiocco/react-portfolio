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
import SkillsForm from '../SkillsForm/SkillsForm';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';

class SkillsList extends Component {
    componentDidMount() {
        this.getSkills();
    }

    getSkills() {
        axios.get('http://localhost:8080/skills').then(res => {
            this.props.dispatch({type: 'SET_SKILLS', payload: res.data})
        });
    }

    deleteSkill(skill) {
        axios.delete('http://localhost:8080/skill/'+skill._id).then(res => {
            console.log(res);
            this.props.dispatch({type: 'DELETE_SKILL', payload: skill._id});
        })
    }

    showSnackBar(message) {
        this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: message, variant: 'success'}});
    }

    closeSnackbar() {
        this.props.dispatch({type: 'HIDE_SNACKBAR'});
    }

    showSkillsForm() {
        this.props.dispatch({type: 'SHOW_SKILLS_FORM'});
    }
    render() {
        return (
            <div>
                <div className='list-container' style={{display: !this.props.skillsForm.show? 'block': 'none'}}>
                    <h4 style={{textAlign: 'center'}}>Skills</h4>
                    <div className='skills'>
                        <List className='list'>
                            {this.props.skills.map((skill) => (
                                <ListItem key={skill._id} className='list-item'>
                                    <ListItemIcon>
                                        <BookmarkRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={skill.name + ' - ' + skill.percentage + '%'}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={this.deleteSkill.bind(this, skill)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <div style={{textAlign:'right', marginTop: '15px'}}>
                        <Tooltip title="Add" aria-label="add">
                            <Fab color="secondary" onClick={this.showSkillsForm.bind(this)}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </div>
                </div>

                <SkillsForm/>
                <CustomizedSnackbars closeIt={this.closeSnackbar.bind(this)} variant={this.props.snackBar.snackbarVariant} message={this.props.snackBar.snackbarMessage} open={this.props.snackBar.showSnackBar}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        skills: state.skills,
        snackBar: state.snackBar,
        skillsForm: state.skillsForm
    };
};
export default connect(mapStateToProps)(SkillsList);
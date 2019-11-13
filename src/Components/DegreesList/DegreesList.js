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
import DegreesForm from '../DegreesForm/DegreesForm';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import moment from 'moment';

class DegreesList extends Component {
    componentDidMount() {
        axios.get('http://localhost:8080/degrees').then(res => {
            this.props.dispatch({type: 'SET_DEGREES', payload: res.data})
        });
    }

    deleteDegree(degree) {
        axios.delete('http://localhost:8080/degree/'+degree._id).then(res => {
            console.log(res);
            this.props.dispatch({type: 'DELETE_DEGREE', payload: degree._id});
        });
    }

    showSnackBar(message) {
        this.props.dispatch({type: 'SHOW_SNACKBAR', payload: {message: message, variant: 'success'}});
    }

    closeSnackbar() {
        this.props.dispatch({type: 'HIDE_SNACKBAR'});
    }

    showDegreesForm() {
        this.props.dispatch({type: 'SHOW_DEGREES_FORM'});
    }
    render() {
        return (
            <div>
                <div className='list-container' style={{display: !this.props.degreesForm.show? 'block': 'none'}}>
                    <h4 style={{textAlign: 'center'}}>Degrees</h4>
                    <div className='degrees'>
                        <List className='list'>
                            {this.props.degrees.map((degree) => (
                                <ListItem key={degree._id} className='list-item'>
                                    <ListItemIcon>
                                        <BookmarkRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={degree.name + ' - ' + moment(degree.endDate).year()}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={this.deleteDegree.bind(this, degree)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <div style={{textAlign:'right', marginTop: '15px'}}>
                        <Tooltip title="Add" aria-label="add">
                            <Fab color="secondary" onClick={this.showDegreesForm.bind(this)}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </div>
                </div>
                <DegreesForm/>
                <CustomizedSnackbars closeIt={this.closeSnackbar.bind(this)} variant={this.props.snackBar.snackbarVariant} message={this.props.snackBar.snackbarMessage} open={this.props.snackBar.showSnackBar}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        degrees: state.degrees,
        snackBar: state.snackBar,
        degreesForm: state.degreesForm
    };
};
export default connect(mapStateToProps)(DegreesList);
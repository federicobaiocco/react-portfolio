import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    skill: {
        width: '50%',
        margin: 10
    }
});

export default function  Skill(props){
    const classes = useStyles();

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px', marginBottom: '15px'}}>
            <span style={{width: '120px'}}>{props.title}</span>
            <LinearProgress className={classes.skill} variant="determinate" value={props.percentage} />
        </div>
    )
}

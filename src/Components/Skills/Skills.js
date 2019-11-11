import React, {Component} from 'react';
import {connect} from "react-redux";
import Skill from "../Skill/Skill";
import axios from 'axios';

class Skills extends Component {
    componentDidMount() {
        axios.get('http://localhost:8080/skills').then(res => {
            console.info(res.data);
            this.props.dispatch({type: 'SET_SKILLS', payload: res.data});
        });
    }
    render() {
        return (
            this.props.skills.map( (skill) => (
                <div key={skill._id} >
                    <Skill title={skill.name} percentage={skill.percentage}/>
                </div>
            ))
        )
    }
}
const mapStateToProps = (state) => {
    return {
        skills: state.skills
    };
};
export default connect(mapStateToProps)(Skills);
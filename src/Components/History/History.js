import React, {Component} from 'react';
import './style.css';
import {connect} from "react-redux";
import moment from 'moment';
import _ from 'lodash';
import axios from "axios/index";
class History extends Component{
    state = {
        groupedDegrees: []
    };
    componentDidMount() {
        axios.get('http://localhost:8080/degrees').then(res => {
            let degrees = _.chain(res.data)
                            .groupBy(degree => moment(degree.endDate).year())
                            .map((value, key) => ({ year: key, degrees: value }))
                            .value();
            this.props.dispatch({type: 'SET_DEGREES', payload: degrees});
        });
    }

    render() {
        return (
            <div>
                <div className="page">
                    <div className="timeline">
                        <div className="timeline__group">
                            {this.props.degrees.map(year => {
                                <div className="timeline__box">
                                    <div className="timeline__date">
                                        <span className="timeline__day">2019</span>
                                    </div>
                                    <div className="timeline__post">
                                        <div className="timeline__content">
                                            <h4>Titulo</h4>
                                            <p>Upon moving to Brooklyn that summer, I began photographing weddings in
                                                Chicago</p>
                                        </div>
                                    </div>
                                    <div className="timeline__post">
                                        <div className="timeline__content">
                                            <h4>Titulo</h4>
                                            <p>Upon moving to Brooklyn that summer, I began photographing weddings in
                                                Chicago</p>
                                        </div>
                                    </div>
                                </div>

                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        degrees: state.degrees
    };
};
export default connect(mapStateToProps)(History);
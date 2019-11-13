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
            console.log(this.props.degrees)
        });
    }

    render() {
        return (
            <div className='historyContainer'>
                <div className="page">
                    <div className="timeline">
                        <div className="timeline__group">
                            {this.props.degrees.map(box => (
                                <div key={box.year} className="timeline__box">
                                    <div className="timeline__date">
                                        <span className="timeline__day">{box.year}</span>
                                    </div>

                                    {box.degrees.map(details => (
                                            <div key={details.name} className="timeline__post">
                                                <div className="timeline__content">
                                                    <h4>{details.name}</h4>
                                                    <p>{details.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ))}
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
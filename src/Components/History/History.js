import React, {Component} from 'react';
import './style.css';

export default class VerticalLinearStepper extends Component{
    render() {
        return (
            <div>
                <div className="page">
                    <div className="timeline">
                        <div className="timeline__group">
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
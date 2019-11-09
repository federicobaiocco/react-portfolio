import React, {Component} from 'react';
import MediaCard from "../MediaCard/MediaCard";
import {connect} from "react-redux";
import axios from 'axios';

class MediaCards extends Component {
    componentDidMount() {
        axios.get('http://localhost:8080/experiences').then(res => {
            this.props.dispatch({type: 'SET_EXPERIENCES', payload: res.data})
        });
    }
    render() {
        return (
                this.props.experiences.map( (card) => (
                    <div key={card.name}>
                        <MediaCard title={card.name}
                                   description={card.description}
                                   imageUrl={card.image}/>
                    </div>
                ))
                )

    }
}
const mapStateToProps = (state) => {
    return {
        experiences: state.experiences
    };
};
export default connect(mapStateToProps)(MediaCards);
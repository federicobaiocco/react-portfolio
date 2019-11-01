import React, {Component} from 'react';
import MediaCard from "../MediaCard/MediaCard";
import {connect} from "react-redux";

class MediaCards extends Component {
    render() {
        return (
                this.props.experiences.map( (card) => (
                    <div key={card.title}>
                        <MediaCard title={card.title}
                                   description={card.description}
                                   imageUrl={card.imageUrl}/>
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
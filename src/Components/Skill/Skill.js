import React, {Component} from 'react';
import {connect} from "react-redux";

class Skill extends Component {
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
const mapStateToProps = (Skill) => {
    return {
        experiences: state.experiences
    };
};
export default connect(mapStateToProps)(MediaCards);
import React, {Component} from 'react';
import MediaCard from "../MediaCard/MediaCard";

export default class MediaCards extends Component {
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
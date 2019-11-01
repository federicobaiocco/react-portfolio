import React, {Component} from 'react';
import './App.css'
import { Provider } from 'react-redux';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import MediaCards from "./Components/MediaCards/MediaCards";
import store from './store';

class App extends Component{

    state = {
        experiences: [
            {
                title: 'Angular',
                description: '...',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/512px-Angular_full_color_logo.svg.png'
            },
            {
                title: 'React',
                description: '...',
                imageUrl: 'https://cdn.worldvectorlogo.com/logos/react.svg'
            },
            {
                title: 'Angularr',
                description: '...',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/512px-Angular_full_color_logo.svg.png'
            },
            {
                title: 'Reactr',
                description: '...',
                imageUrl: 'https://cdn.worldvectorlogo.com/logos/react.svg'
            },
            {
                title: 'Node',
                description: '...',
                imageUrl: 'data:image/png;base64,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'
            },
            {
                title: 'Angular3',
                description: '...',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/512px-Angular_full_color_logo.svg.png'
            },
            {
                title: 'React3',
                description: '...',
                imageUrl: 'https://cdn.worldvectorlogo.com/logos/react.svg'
            },
            {
                title: 'Node3',
                description: '...',
                imageUrl: 'data:image/png;base64,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'
            }

        ],
        header : {
            headerState: 'normal'
        }
    };

    // fixHeader = () => {
    //     this.setState({header: {headerState: 'fixedTop'}});
    //
    // };
    //
    // unfixHeader = () => {
    //     this.setState({header: {headerState: 'normal'}});
    // };

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header headerState={this.state.header.headerState}/>
                    <Navbar/>
                    {/*<Navbar fixHeader={this.fixHeader} unfixHeader={this.unfixHeader}/>*/}
                    <section className='media-cards-container'>
                        <MediaCards experiences={this.state.experiences}/>
                    </section>
                </div>
            </Provider>
        );
    }
}
export default App;
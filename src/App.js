import React, {Component} from 'react';
import './App.css'
import { Provider } from 'react-redux';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import MediaCards from "./Components/MediaCards/MediaCards";
import Skills from "./Components/Skills/Skills";
import store from './store';

class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header/>
                    <Navbar/>
                    <section className='roboto'>
                        <h1 style={{textAlign: 'center'}}>Experiences</h1>
                        <div className='media-cards-container'>
                            <MediaCards/>
                        </div>
                    </section>
                    <section className='skills-container roboto'>
                        <h1 style={{textAlign: 'center'}}>Skills</h1>
                        <Skills/>
                    </section>
                </div>
            </Provider>
        );
    }
}
export default App;
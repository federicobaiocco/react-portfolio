import React, {Component} from 'react';
import './App.css'
import { Provider } from 'react-redux';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import MediaCards from "./Components/MediaCards/MediaCards";
import store from './store';

class App extends Component{

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header/>
                    <Navbar/>
                    <section className='media-cards-container'>
                        <MediaCards/>
                    </section>
                    <section>
                        
                    </section>
                </div>
            </Provider>
        );
    }
}
export default App;
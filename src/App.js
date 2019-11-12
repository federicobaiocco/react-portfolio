import React, {Component} from 'react';
import './App.css'
import { Provider } from 'react-redux';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import MediaCards from "./Components/MediaCards/MediaCards";
import Skills from "./Components/Skills/Skills";
import store from './store';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExperiencesList from "./Components/ExperiencesList/ExperiencesList";
import SkillsList from "./Components/SkillsList/SkillsList";
import DegreesList from "./Components/DegreesList/DegreesList";
import History from './Components/History/History';
class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route exact path="/">
                        <Header name='Federico Baiocco'/>
                        <Navbar/>
                        <section className='roboto'>
                            <h1 style={{textAlign: 'center'}}>Experiences</h1>
                            <div className='media-cards-container'>
                                <MediaCards/>
                            </div>
                        </section>
                        <section className='container roboto'>
                            <h1 style={{textAlign: 'center'}}>Skills</h1>
                            <Skills/>
                        </section>
                        <section className='container roboto'>
                            <h1 style={{textAlign: 'center'}}>Degrees</h1>
                            <History/>
                        </section>
                    </Route>
                    <Route exact path="/admin">
                        <Header name='Admin'/>
                        <section className='roboto container'>
                            <ExperiencesList/>
                            <SkillsList/>
                            <DegreesList/>
                        </section>
                    </Route>
                    <Route exact path="/contact">
                        <Header name='Federico Baiocco'/>
                        <Navbar/>
                        <section className='roboto container'>

                        </section>
                    </Route>
                </Router>
            </Provider>
        );
    }
}
export default App;
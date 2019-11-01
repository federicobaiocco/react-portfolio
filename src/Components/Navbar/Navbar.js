import React, {Component} from 'react';
import './style.css';
import { connect } from 'react-redux';

class Navbar extends Component {
    handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        if(currentScrollPos < 40) {
            this.props.dispatch({ type: 'UNFIX_HEADER' });
            this.props.dispatch({type: 'SHOW_NAVBAR'});
        }
        else {
            this.props.dispatch({ type: 'FIX_HEADER' });
            this.props.dispatch({type: 'HIDE_NAVBAR'});
        }
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    render() {
        return (
            <nav className={!this.props.visible ? 'navbar-hidden': ''}>
                <div className='nav-items-container'>
                    <ul>
                        <li>HOME</li>
                        <li>PORTFOLIO</li>
                        <li>ABOUT</li>
                        <li>CONTACT</li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.navbar.visible
    };
};

export default connect(mapStateToProps)(Navbar);
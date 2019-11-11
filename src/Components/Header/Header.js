import React, {Component} from 'react';
import './style.css';
import {connect} from "react-redux";

class Header extends Component {
    render() {
        const name = this.props.name;
        return (
            <header className={this.props.headerState === 'fixedTop' ? 'header-fixed': ''}>
                <h1 className='logo nunito'>{name.charAt(0)}</h1>
                <h4 className='roboto'>{name.toUpperCase()}</h4>
            </header>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        headerState: state.header.headerState
    };
};
export default connect(mapStateToProps)(Header);

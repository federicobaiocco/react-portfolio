import React, {Component} from 'react';
import './style.css';
import {connect} from "react-redux";

class Header extends Component {
    render() {
        return (
            <header className={this.props.headerState === 'fixedTop' ? 'header-fixed': ''}>
                <h1 className='logo nunito'>F</h1>
                <h4 className='roboto'>FEDERICO BAIOCCO</h4>
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

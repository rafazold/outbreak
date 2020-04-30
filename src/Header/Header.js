import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import './Header.scss';

const Header = () => {

    return (
        <header className="Header">
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand className="navbar-brand header-brand" href="#home"><img src="./covid19-logo.svg" alt="covid19"/></Navbar.Brand>
            </Navbar>
        </header>
    );
};

export default Header;

import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import './Header.scss';

const Header = () => {

    return (
        <header className="Header">
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand className="navbar-brand header-brand" href="#home"><img src="./covid19-logo.svg" alt="covid19"/></Navbar.Brand>
                {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
                {/*<Navbar.Collapse id="basic-navbar-nav">*/}
                {/*    <Nav className="mr-auto row justify-content-start">*/}
                        {/*<Nav.Link className="nav-link" href="#">Home</Nav.Link>*/}
                        {/*<Nav.Link className="nav-link" href="#">About</Nav.Link>*/}
                        {/*<Nav.Link className="nav-link" href="#">Contact</Nav.Link>*/}
                {/*    </Nav>*/}
                {/*</Navbar.Collapse>*/}
            </Navbar>
        </header>
    );
};

export default Header;

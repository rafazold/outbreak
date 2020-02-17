import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import './Header.scss';

const Header = () => {

    return (
        <div className="Header">
            <Navbar className="row justify-content-start" fluid="false" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand className="navbar-brand" href="#home">The Epidemic Map</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto row justify-content-start">
                        <Nav.Link className="nav-link" href="#">Home</Nav.Link>
                        <Nav.Link className="nav-link" href="#">About</Nav.Link>
                        <Nav.Link className="nav-link" href="#">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;

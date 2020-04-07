import React, {useState} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
// import ReactDOM from "react-dom";

import "./App.scss";
import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";
import {Container} from "react-bootstrap";
import Footer from "./Footer/Footer";

const App = () => {

    return (
    <div className="wrapper">
        <Container>
            <Header/>
            <Dashboard/>
            <Footer/>
        </Container>
    </div>
)};

export default App
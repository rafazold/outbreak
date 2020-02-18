import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
import 'bootstrap/dist/css/bootstrap.min.css';
// import ReactDOM from "react-dom";

import "./App.scss";
import Map from "./Dashboard/Map/Map";
import Header from "./Header/Header";

const App = () => {
    const [content, setContent] = useState("");

    return (
    <div>
        <Header/>
        <Map setTooltipContent={setContent}/>
        <ReactTooltip>{content}</ReactTooltip>
    </div>
)};

export default App
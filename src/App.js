import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
// import ReactDOM from "react-dom";

import "./App.scss";
import MapChart from "./Map/Map";

const App = () => {
    const [content, setContent] = useState("");

    return (
    <div>
        <MapChart setTooltipContent={setContent}/>
        <ReactTooltip>{content}</ReactTooltip>
    </div>
)};

export default App
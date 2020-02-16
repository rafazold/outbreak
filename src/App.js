import React, {useState} from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import ReactDOM from "react-dom";

import "./App.scss";
import ChoroplethMap from "./Map/Map";

const App = () => {
    const [content, setContent] = useState("");

    return (
    <div>
        <ChoroplethMap setTooltipContent={setContent}/>
        <ReactTooltip>{content}</ReactTooltip>
    </div>
)};

export default App
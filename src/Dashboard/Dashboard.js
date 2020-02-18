import "./Dashboard.scss";
import React, {useState} from 'react';
import Title from "./Title/Title";
import Map from "./Map/Map";
import ReactTooltip from "react-tooltip";
import StatsFeed from "./StatsFeed/StatsFeed";


function Dashboard() {
    const [content, setContent] = useState("");
    return (
        <div className="dashboard">
            <Title/>
            <StatsFeed/>
            <Map setTooltipContent={setContent}/>
            <ReactTooltip>{content}</ReactTooltip>
            <div className="reports">REPORTS</div>
        </div>
    );
}

export default Dashboard;
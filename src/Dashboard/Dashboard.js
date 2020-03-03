import "./Dashboard.scss";
import React, {useState} from 'react';
import DashHeader from "./DashHeader/DashHeader";
import Map from "./Map/Map";
import ReactTooltip from "react-tooltip";
import StatsFeed from "./StatsFeed/StatsFeed";


function Dashboard() {
    const [content, setContent] = useState("");
    return (
        <div className="dashboard">
            <DashHeader/>
            <StatsFeed/>
            <Map setTooltipContent={setContent}/>
            <ReactTooltip multiline={true} html={true}> {`${content}<br />${content}<br />${content}`}</ReactTooltip>
            <div className="reports">REPORTS</div>
        </div>
    );
}

export default Dashboard;
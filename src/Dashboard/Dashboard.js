import "./Dashboard.scss";
import React, {useState, useEffect} from 'react';
import DashHeader from "./DashHeader/DashHeader";
import Map from "./Map/Map";
import ReactTooltip from "react-tooltip";
import StatsFeed from "./StatsFeed/StatsFeed";


function Dashboard() {
    const [toolpitGeo, setToolpitGeo] = useState("");
    const [toolpitInfected, setToolpitInfected] = useState("");
    const [toolpitCasualties, setToolpitCasualties] = useState("");
    const affectedCountries = {};
    const [infectedCountries, setInfectedCountries] = useState({});
    const [fetching, setFetching] = useState(true);



    useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/' + 'https://covid2019-api.herokuapp.com/current_list')
            .then(res => res.json())
            .then(geos => {
                setInfectedCountries(geos.countries[0]);
                return geos.countries[0];
            })
            .then(infected => {
                console.log('finished: ', infected)
                setFetching(false)})
    }, [])
    return (
        <div className="dashboard">
            <DashHeader/>
            <StatsFeed/>
            <Map setToolpitName={setToolpitGeo}
                 setToolpitInfected={setToolpitInfected}
                 setToolpitCasualties={setToolpitCasualties}
                 infected={infectedCountries}
            />
            <ReactTooltip html={true}>
                {`${toolpitGeo}<br />
                ${toolpitInfected}<br />
                ${toolpitCasualties}`
                }
            </ReactTooltip>
            <div className="reports">REPORTS</div>
        </div>
    );
}

export default Dashboard;

// infectedCountries[formatName(toolpitGeo)].confirmed


// const arrayToObject = (array) =>
//     array.reduce((obj, item) => {
//         obj[item.id] = item
//         return obj
//     }, {})
// const peopleObject = arrayToObject(peopleArray)
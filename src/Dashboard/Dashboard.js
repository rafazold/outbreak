import "./Dashboard.scss";
import React, {useState, useEffect} from 'react';
import DashHeader from "./DashHeader/DashHeader";
import Map from "./Map/Map";
import ReactTooltip from "react-tooltip";
import StatsFeed from "./StatsFeed/StatsFeed";
import { ReactTinyLink } from 'react-tiny-link';


function Dashboard() {
    const [toolpitGeo, setToolpitGeo] = useState("");
    const [toolpitInfected, setToolpitInfected] = useState("");
    const [toolpitCasualties, setToolpitCasualties] = useState("");
    const affectedCountries = {};
    const [infectedCountries, setInfectedCountries] = useState({});
    const [fetching, setFetching] = useState(true);
    const [total, setTotal] = useState({});



    useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/' + 'https://covid2019-api.herokuapp.com/current_list')
            .then(res => res.json())
            .then(geos => {
                setInfectedCountries(geos.countries[0]);
                return geos.countries[0];
            })
            .then(infected => {
                console.log('finished: ', infected);
                setFetching(false)})
    }, []);

    useEffect(() => {
        fetch( 'https://cors-anywhere.herokuapp.com/' + 'https://covid2019-api.herokuapp.com/total')
            .then(res => res.json())
            .then(total => setTotal(total))
    }, []);

    return (
        <div className="dashboard">
            <DashHeader/>
            <StatsFeed
                totalStats={total}
                infectedGeos={Object.keys(infectedCountries)}
            />
            <Map setToolpitName={setToolpitGeo}
                 setToolpitInfected={setToolpitInfected}
                 setToolpitCasualties={setToolpitCasualties}
                 infected={infectedCountries}
            />
            <ReactTooltip html={true} effect="solid">
                {`${toolpitGeo}<br />
                ${toolpitInfected}<br />
                ${toolpitCasualties}`
                }
            </ReactTooltip>
            <div className="reports">
                {/*TODO: make this in a separate component*/}
                <ReactTinyLink
                    cardSize="large"
                    width="30%"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url="https://edition.cnn.com/2020/03/05/asia/coronavirus-covid-19-update-india-intl-hnk/index.html"
                />
                <ReactTinyLink
                    cardSize="large"
                    width="30%"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url="https://www.npr.org/sections/goatsandsoda/2020/03/05/812570693/how-coronavirus-spreads-a-cough-in-your-face-or-a-kiss-on-your-cheek"
                />
                <ReactTinyLink
                    cardSize="large"
                    width="30%"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url="https://www.bbc.com/news/world-africa-51752974"
                />
            </div>
        </div>
    );
}

export default Dashboard;
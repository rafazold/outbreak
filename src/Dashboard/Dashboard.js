import "./Dashboard.scss";
import React, {useState, useEffect} from 'react';
import GraphHeader from "./Graph/GraphHeader/GraphHeader";
import Map from "./Map/Map";
import ReactTooltip from "react-tooltip";
import StatsFeed from "./StatsFeed/StatsFeed";
import Reports from "./Reports/Reports";
import TimelineGraph from "./Graph/TimelineGraph/TimelineGraph";
import StatsFooter from "./StatsFooter/StatsFooter";
const { getCode, getName } = require('country-list');



function Dashboard() {
    const [tooltipGeo, setTooltipGeo] = useState("");
    const [tooltipInfected, setTooltipInfected] = useState("");
    const [tooltipCasualties, setTooltipCasualties] = useState("");
    const [tooltipRecovered, setTooltipRecovered] = useState("");
    const affectedCountries = {};
    const [countriesObject, setCountriesObject] = useState({});
    const [fetching, setFetching] = useState(true);
    const [total, setTotal] = useState({});
    const [countryList, setCountryList] = useState([])



    useEffect(() => {
        fetch( 'https://corona.lmao.ninja/all')
            .then(res => res.json())
            .then(total => setTotal(total))
    }, []);

    useEffect(() => {
        fetch('https://corona.lmao.ninja/countries')
            .then(res => res.json())
            .then(countryArr => {
                let countryObj = {totals: total};
                let geoArr = [];
                countryArr.forEach(country => {
                    geoArr.push(country.countryInfo.iso2);
                    countryObj[country.countryInfo.iso2] = country
                })
                setCountriesObject(countryObj);
                setCountryList(geoArr);
                // console.log(geoArr)
                return countryObj

            })
            .then(infected => {
                setFetching(false)})
    }, [total]);

    const infectedCountries = countryList.map(geo => {
        if (geo !== 'undefined') {
            return geo;
        }
        return getName(geo);

    })

    return (
        <div className="dashboard">
            <h2 className="dashboard-header-title">See live outbreaks, reports and statistics</h2>
            <Map setTooltipGeo={setTooltipGeo}
                 setTooltipInfected={setTooltipInfected}
                 setTooltipCasualties={setTooltipCasualties}
                 setTooltipRecovered={setTooltipRecovered}
                 countriesObject={countriesObject}
            />
            <StatsFeed
                totalStats={total}
                infectedGeos={countryList}
                setTooltipGeo={setTooltipGeo}
                setTooltipInfected={setTooltipInfected}
                setTooltipCasualties={setTooltipCasualties}
                setTooltipRecovered={setTooltipRecovered}
                countriesObject={countriesObject}
            />
            <p data-tip='' data-for='tooltip'></p>
            <ReactTooltip html={true}
                          id={tooltipGeo === '' ? '' : `tooltip`}
            >
                {`${tooltipGeo}<br />
                ${tooltipInfected}<br />
                ${tooltipCasualties}<br />
                ${tooltipRecovered}`
                }
            </ReactTooltip>
            <StatsFooter geos={infectedCountries}/>
            <div className="reports">

                <Reports/>
            </div>
        </div>
    );
}

export default Dashboard;
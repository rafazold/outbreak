import "./Dashboard.scss";
import React, {useState, useEffect} from 'react';
import Map from "./Map/Map";
import ReactTooltip from "react-tooltip";
import StatsFeed from "./StatsFeed/StatsFeed";
import Reports from "./Reports/Reports";
import StatsFooter from "./StatsFooter/StatsFooter";
import config from '../config';
const { getName } = require('country-list');



function Dashboard() {
    const [tooltipGeo, setTooltipGeo] = useState("");
    const [tooltipInfected, setTooltipInfected] = useState("");
    const [tooltipCasualties, setTooltipCasualties] = useState("");
    const [tooltipRecovered, setTooltipRecovered] = useState("");
    const [countriesObject, setCountriesObject] = useState({});
    const [serverup, setServerup] = useState(false);
    const [total, setTotal] = useState({});
    const [countryList, setCountryList] = useState([])

useEffect(() => {
    fetch(`${config.apiUrl}/api/start`)
        .then(res => {
            if (res.status === 200) {
                setServerup(true)
            }
        })
}, [])

    useEffect(() => {
        getCurrentStats()
    }, [serverup])

    const getCurrentStats = () => {
        fetch(`${config.apiUrl}/api/current`)
            .then(res => res.json())
            .then(currStats => {
                const totals = {
                    updated: currStats[0].updated,
                    cases: currStats[0].cases,
                    deaths: currStats[0].deaths,
                    recovered: currStats[0].recovered,
                }
                setTotal(totals);
                return currStats[0];
            })
            .then(currentStats => {
                const countryArr = currentStats.countries;
                let countryObj = {totals: total};
                let geoArr = [];
                countryArr.forEach(country => {
                    geoArr.push(country.countryInfo.iso2);
                    countryObj[country.countryInfo.iso2] = country
                })
                setCountriesObject(countryObj);
                setCountryList(geoArr);
                return countryObj

            })
    }

    const infectedCountries = countryList.map(geo => {
        if (geo !== 'undefined') {
            return geo;
        }
        return getName(geo);

    })
    const handleTouchStart = e => {
        e.preventDefault()
    }
    return (
        <div className="dashboard"
             onTouchStart={handleTouchStart}
        >
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
            <p data-tip='' data-for='tooltip' data-delay-hide='1000'></p>
            <ReactTooltip html={true}
                          clickable={true}
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
                <Reports serverup={serverup} />
            </div>
        </div>
    );
}

export default Dashboard;
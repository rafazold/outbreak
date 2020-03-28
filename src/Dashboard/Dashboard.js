import "./Dashboard.scss";
import React, {useState, useEffect} from 'react';
import DashHeader from "./DashHeader/DashHeader";
import Map from "./Map/Map";
import ReactTooltip from "react-tooltip";
import StatsFeed from "./StatsFeed/StatsFeed";
import Reports from "./Reports/Reports";



function Dashboard() {
    const [toolpitGeo, setToolpitGeo] = useState("");
    const [toolpitInfected, setToolpitInfected] = useState("");
    const [toolpitCasualties, setToolpitCasualties] = useState("");
    const [toolpitRecovered, setToolpitRecovered] = useState("");
    const affectedCountries = {};
    const [countriesObject, setCountriesObject] = useState({});
    const [fetching, setFetching] = useState(true);
    const [total, setTotal] = useState({});





    // useEffect(() => {
    //     fetch('https://cors-anywhere.herokuapp.com/' + 'https://covid2019-api.herokuapp.com/current_list')
    //         .then(res => res.json())
    //         .then(geos => {
    //             setCountriesObject(geos.countries[0]);
    //             return geos.countries[0];
    //         })
    //         .then(infected => {
    //             setFetching(false)})
    // }, []);

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
                countryArr.forEach(country => {
                    countryObj[country.countryInfo.iso2] = country
                })
                setCountriesObject(countryObj);
                return countryObj

            })
            .then(infected => {
                setFetching(false)})
    }, [total]);



    return (
        <div className="dashboard">
            <DashHeader/>
            <StatsFeed
                totalStats={total}
                infectedGeos={Object.keys(countriesObject)}
            />
            <Map setToolpitName={setToolpitGeo}
                 setToolpitInfected={setToolpitInfected}
                 setToolpitCasualties={setToolpitCasualties}
                 setToolpitRecovered={setToolpitRecovered}
                 infected={countriesObject}
            />
            <p data-tip='' data-for='toolpit'></p>
            {/*<ReactTooltip id='toolpit' getContent={() => { return null }}/>*/}
            <ReactTooltip html={true}
                          id={toolpitGeo === '' ? '' : 'toolpit'}
            >
                {`${toolpitGeo}<br />
                ${toolpitInfected}<br />
                ${toolpitCasualties}<br />
                ${toolpitRecovered}`
                }
            </ReactTooltip>
            <div className="reports">

                {/*<Reports/>*/}
            </div>
        </div>
    );
}

export default Dashboard;
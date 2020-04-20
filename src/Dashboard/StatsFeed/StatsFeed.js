import "./StatsFeed.scss";

import React from 'react';
import Flag from 'react-world-flags'
import TimelineGraph from "../Graph/TimelineGraph/TimelineGraph";
import GraphHeader from "../Graph/GraphHeader/GraphHeader";
import ReactTooltip from "react-tooltip";
import getValueFromCountryObject from "../../helpers/getValuesFromCountryObject"
const { getCode, getName } = require('country-list');

function StatsFeed({totalStats, infectedGeos, setTooltipGeo, setTooltipInfected, countriesObject, setTooltipCasualties, setTooltipRecovered}) {

    const tooltip = (country) => {
        setTooltipGeo(getName(country))
        setTooltipInfected(`cases: ${countriesObject[country].cases.toLocaleString()}`);
        setTooltipCasualties(`fatalities: ${countriesObject[country].deaths.toLocaleString()}`);
        setTooltipRecovered(`recovered: ${countriesObject[country].recovered.toLocaleString()}`)
    }

    return (
        <article className="stats">
            <header className="stats-feed-header">
            <span className="feed-title">
                <span className="feed-title-top">World Wide</span>
                <span className="feed-title-bottom">Coronavirus</span>
            </span>
                <span className="feed-read">
                    <a href="https://en.wikipedia.org/wiki/Coronavirus_disease_2019" target="_blank" >Read</a
                    ></span>
            </header>
            <div className="feed-content">
                <div className="feed-content-numbers information">
                <span className="feed-content-numbers-item">
                    <span className="feed-content-numbers-title">
                        <span className="feed-content-numbers-icon">
                            <img src="./assets/cell-division.svg" alt="cell-icon"/>
                        </span>
                        <span className="feed-content-numbers-title-text">Cases</span>
                    </span>
                    <span className="feed-content-numbers-value">
                        {totalStats.cases ? totalStats.cases.toLocaleString() : 0}
                    </span>
                </span>
                    <span className="feed-content-numbers-item">
                    <span className="feed-content-numbers-title">
                        <span className="feed-content-numbers-icon"><img src="./assets/grave.svg"
                                                                         alt="grave"/></span>
                        <span className="feed-content-numbers-title-text">Fatalities</span>
                    </span>
                    <span className="feed-content-numbers-value">
                        {totalStats.deaths ? totalStats.deaths.toLocaleString() : 0}
                    </span>
                </span>
                </div>
                <div className="feed-content-source information">
                    <span className="feed-content-source-title">Source of outbreak</span>
                    <span className="feed-content-source-flag" data-tip="">
                        <Flag onMouseEnter={() => tooltip("CN")} code={"CN"} height={"100%"}/>
                </span>
                </div>
                <div className="feed-content-countries information">
                    <span className="feed-content-countries-title">Most Affected Countries</span>
                    <div className="feed-content-flags" data-tip="">
                        {infectedGeos.map(country => {
                            if (countriesObject[country].casesPerOneMillion > 1000 && countriesObject[country].cases > 1000) {return (
                        <span className="feed-content-flag" key={country}>
                            <Flag code={country} height={"100%"} width={"100%"} onMouseEnter={() => tooltip(country)} />
                        </span>
                        )}})}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default StatsFeed;
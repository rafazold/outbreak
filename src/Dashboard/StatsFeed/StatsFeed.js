import "./StatsFeed.scss";

import React from 'react';
import Flag from 'react-world-flags'
const { getCode, getName } = require('country-list');

function StatsFeed({totalStats, infectedGeos}) {
    const infectedCountries = ['CN', 'IT', 'JP', 'FR', 'ES', 'US', "AR", 'IL', 'NO']
    const infectedCountries1 = infectedGeos.map(geo => {
        if (geo.toLowerCase() === 'mainland_china') {
            return 'CN'
        }
        if (geo.toLowerCase() === 'south_korea') {
            return 'KR'
        }
        if (geo.toLowerCase() === 'taiwan') {
            return 'TW'
        }
        if (geo.toLowerCase() === 'others') {
            return ''
        }
        if (geo.toLowerCase() === 'iran') {
            return 'IR'
        }
        if (geo.length < 4) {
            return geo;
        }

        return getCode(geo.split("_").join(' '));

    })
    return (
        <article className="stats">
            <header className="stats-feed-header">
                <span className="feed-title">
                    <span className="feed-title-top">World Wide</span>
                    <span className="feed-title-bottom">Coronavirus</span>
                </span>
                <span className="feed-read">Read</span>
            </header>
            <div className="feed-content">
                <div className="feed-content-numbers">
                    <span className="feed-content-numbers-item">
                        <span className="feed-content-numbers-title">
                            <span className="feed-content-numbers-icon">
                                <img src="./assets/cell-division.svg" alt="cell-icon"/>
                            </span>
                            <span className="feed-content-numbers-title-text">Infected</span>
                        </span>
                        <span  className="feed-content-numbers-value">
                            {totalStats.cases ? totalStats.cases.toLocaleString() : 0}
                        </span>
                    </span>
                    <span className="feed-content-numbers-item">
                        <span className="feed-content-numbers-title">
                            <span className="feed-content-numbers-icon"><img src="./assets/grave.svg" alt="grave"/></span>
                            <span className="feed-content-numbers-title-text">Casualties</span>
                        </span>
                        <span  className="feed-content-numbers-value">
                            {totalStats.deaths ? totalStats.deaths.toLocaleString() : 0}
                        </span>
                    </span>
                </div>
                <div className="feed-content-source">
                    <span className="feed-content-source-title">Source of outbreak</span>
                    <span className="feed-content-source-flag">
                        <Flag code={"CN"} height={"100%"} />
                    </span>
                </div>
                <div className="feed-content-countries">
                    <span className="feed-content-countries-title">Infected Countries</span>
                    <div className="feed-content-flags">
                        {infectedCountries.map(country => (
                            <span className="feed-content-flag">
                                <Flag code={country} height={"100%"}/>
                            </span>
                            ))}
                    </div>
                </div>
                <div className="feed-content-graph">graph</div>
            </div>
        </article>
    );
}

export default StatsFeed;
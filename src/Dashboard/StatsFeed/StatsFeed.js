import "./StatsFeed.scss";

import React from 'react';
import Flag from 'react-world-flags'

function StatsFeed() {
    const infectedCountries = ['CN', 'IT', 'JP', 'FR', 'ES', 'US', "AR", 'IL', 'NO']
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
                        <span  className="feed-content-numbers-value">128,257</span>
                    </span>
                    <span className="feed-content-numbers-item">
                        <span className="feed-content-numbers-title">
                            <span className="feed-content-numbers-icon"><img src="./assets/grave.svg" alt="grave"/></span>
                            <span className="feed-content-numbers-title-text">Casualties</span>
                        </span>
                        <span  className="feed-content-numbers-value">778</span>
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
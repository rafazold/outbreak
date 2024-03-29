import "./StatsFeed.scss";

import React, {useState} from 'react';
import Flag from 'react-world-flags';
import Modal from "react-bootstrap/Modal";
import Header from "../../Header/Header";
const { getName } = require('country-list');

function StatsFeed({totalStats, infectedGeos,setTooltipNewCases, setTooltipGeo, setTooltipInfected, countriesObject, setTooltipCasualties, setTooltipRecovered}) {
    const [showModal, setShowModal] = useState(false)
    const [reportUrl, setReportUrl] = useState();
    const handleShowModal = (url) => {
        setReportUrl(url)
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    const tooltip = (country) => {
        const cases = countriesObject[country].cases;
        const fatalities = countriesObject[country].deaths;
        const recovered = countriesObject[country].recovered;
        const newCases = countriesObject[country].todayCases;
        setTooltipGeo(getName(country))
        setTooltipInfected(`cases: ${cases.toLocaleString()}`);
        setTooltipCasualties(`fatalities: ${fatalities.toLocaleString()} (${Math.round(fatalities/cases*100).toLocaleString()}%)`);
        setTooltipRecovered(`recovered: ${recovered.toLocaleString()} (${Math.round(recovered/cases*100).toLocaleString()}%)`);
        setTooltipNewCases(`today cases: ${newCases.toLocaleString()}`);
    }

    return (
        <article className="stats">
            <header className="stats-feed-header">
            <span className="feed-title">
                <span className="feed-title-top">World Wide</span>
                <span className="feed-title-bottom">Coronavirus</span>
            </span>
                <span className="feed-read" onClick={() => handleShowModal("https://en.wikipedia.org/wiki/Coronavirus_disease_2019")}>
                    Read</span>
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
                            if (countriesObject[country].todayCases > 5000 && countriesObject[country].cases > 1000 ) {return (
                        <span className="feed-content-flag" key={country}>
                            <Flag code={country} height={"100%"} width={"100%"} onMouseEnter={() => tooltip(country)} />
                        </span>
                        )}})}
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                size="xl"
            >
                <Modal.Header closeButton>
                    <Header/>
                </Modal.Header>
                <Modal.Body>
                    <iframe
                        className="report-iframe"
                        src={reportUrl}
                        allowFullScreen={true}
                    />
                </Modal.Body>
            </Modal>
        </article>
    );
}

export default StatsFeed;
import React from 'react';
import "./GraphHeader.scss";
const { getCode, getName } = require('country-list');

function GraphHeader({geos, setGraphGeo}) {

    const handleSelect = (e) => {
        const country = getName(e.target.value.toLowerCase());
        setGraphGeo(country)
    };

    return (
        <div className="dashboard-header">
            <h2 className="dashboard-header-title">See live outbreaks, reports and statistics</h2>
            <select className="dashboard-header-select" name="searchType" id="searchType" onChange={handleSelect}>Select
                {geos.map(geo => (
                    <option value={geo}>{geo}</option>
                ))}
            </select>
        </div>
    );
}

export default GraphHeader;
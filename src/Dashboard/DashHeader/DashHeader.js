import React from 'react';
import "./DashHeader.scss";

function DashHeader(props) {
    return (
        <div className="dashboard-header">
            <h2 className="dashboard-header-title">See live outbreaks, reports and statistics</h2>
            <select className="dashboard-header-select" name="searchType" id="searchType">Select
                <option value="Coronavirus">Coronavirus</option>
                <option value="Malaria">Malaria</option>
                <option value="Flu">Flu</option>
                <option value="Stupidity">Stupidity</option>
                <option value="Craziness">Craziness</option>
            </select>
        </div>
    );
}

export default DashHeader;
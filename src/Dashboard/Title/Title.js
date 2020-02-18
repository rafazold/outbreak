import React from 'react';
import "./Title.scss";

function Title(props) {
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

export default Title;
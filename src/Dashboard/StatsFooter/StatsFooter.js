import React, {useState} from 'react';
import GraphHeader from "./GraphHeader/GraphHeader";
import TimelineGraph from "./TimelineGraph/TimelineGraph";

function StatsFooter({geos, countriesObject}) {
    const [graphGeo, setGraphGeo] = useState('usa');
    return (
        <footer className="feed-content-graph">
            <GraphHeader geos={geos} setGraphGeo={setGraphGeo} graphGeo={graphGeo}/>
            <TimelineGraph geo={graphGeo} countriesObject={countriesObject} />
        </footer>
    );
}

export default StatsFooter;
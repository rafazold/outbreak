import React, {useState} from 'react';
import GraphHeader from "./GraphHeader/GraphHeader";
import TimelineGraph from "./TimelineGraph/TimelineGraph";

function StatsFooter({geos}) {
    const [graphGeo, setGraphGeo] = useState('usa');
    return (
        <footer className="feed-content-graph">
            <GraphHeader geos={geos} setGraphGeo={setGraphGeo} graphGeo={graphGeo}/>
            <TimelineGraph geo={graphGeo}/>
        </footer>
    );
}

export default StatsFooter;
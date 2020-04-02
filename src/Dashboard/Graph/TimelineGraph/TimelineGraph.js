import React, {useEffect, useState} from 'react';
import {LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import "./TimelineGraph.scss"

//TODO: make object

const TimelineGraph = ({geo}) => {
    const [timeObject, setTimeObject] = useState({});
    const [country, setCountry] = useState('us')

    useEffect(() => {
        getGeoTimeline(geo);
    }, [geo])

    const makeObject = (data, geo) => {
        const timelineObj = {...timeObject};
        timelineObj[geo] = {};
        const timeline = data.timeline;
        for (const type in timeline) {
            const datesObj = timeline[type];
            for (const date in datesObj) {
                if(!timelineObj[geo][date]) {
                    timelineObj[geo][date] = {date}
                }
                timelineObj[geo][date][type] = datesObj[date]

                }
            }
        timelineObj[geo] = Object.values(timelineObj[geo])
        return (timelineObj)
        };


    const getGeoTimeline = (geo) => {

        fetch(`https://corona.lmao.ninja/v2/historical/${geo}`)
            .then(res => res.json())
            .then(data => makeObject(data, geo))
            .then(timelineObj => {
                setTimeObject(timelineObj)
            })
            .catch(err => console.log('error fetching Data'))
    }

    return (
        <div className="graph-wrapper">
            <ResponsiveContainer
                width={1000}
                height={250}>
                <LineChart
                    data={timeObject[geo]}
                    margin={{top: 5, right: 30, left: 30, bottom: 5}}>
                    <XAxis dataKey="date"/>
                    <YAxis type="number" domain={[2, 'auto']} tickFormatter={(value) => value.toLocaleString()}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip formatter={(value) => value.toLocaleString()}/>
                    <Legend/>
                    <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="deaths" stroke="#ca829c"/>
                    {/*<Line type="monotone" dataKey="recovered" stroke="#82ca9d" />*/}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TimelineGraph;
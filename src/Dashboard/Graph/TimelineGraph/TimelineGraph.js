import React, {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';






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
        <LineChart width={1000} height={250} data={timeObject[geo]}
                   margin={{top: 5, right: 30, left: 0, bottom: 5}}>
            <XAxis dataKey="date"/>
            <YAxis type="number" domain={[2, 'auto']} />/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="deaths" stroke="#ca829c" />
            {/*<Line type="monotone" dataKey="recovered" stroke="#82ca9d" />*/}
        </LineChart>
    );
}

export default TimelineGraph;


// const data = [
//     {date: '2020-03-20', infected: 25489, deaths: 1398, recovered: 2210},
//     {date: '2020-03-21', infected: 33276, deaths: 9800, recovered: 2290},
//     {date: '2020-03-22', infected: 43847, deaths: 3908, recovered: 2000},
//     {date: '2020-03-23', infected: 53740, deaths: 4800, recovered: 2181},
//     {date: '2020-03-24', infected: 65778, deaths: 3800, recovered: 2500},
//     {date: '2020-03-25', infected: 83836, deaths: 4300, recovered: 2100},
// ];





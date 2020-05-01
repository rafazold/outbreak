import React, {useEffect, useState} from 'react';
import {LineChart, ResponsiveContainer, Brush, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import "./TimelineGraph.scss"
import Numeral from 'numeral'


const TimelineGraph = ({geo}) => {
    const [timeObject, setTimeObject] = useState({});
    const [timelineStart, setTimelineStart] = useState(15)
    // const [country, setCountry] = useState('us')

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

        fetch(`https://disease.sh/v2/historical/${geo}?lastdays=60`)
            .then(res => res.json())
            .then(data => makeObject(data, geo))
            .then(timelineObj => {
                setTimeObject(timelineObj)
                // setTimelineStart(() => timelineObj[geo].length - 15)
            })
            .catch(err => console.log('error fetching Data'))
    }

    const textSize = (value, entry) => {
        console.log('value', value, 'entry', entry)
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        if (width > 800) {
            return 16;
        } else {
            return 10;
        }
    }

    return (
        <div className="graph-wrapper">
            <ResponsiveContainer
                width="100%"
                height="100%"
                minHeight={90}
            >
                <LineChart
                    data={timeObject[geo]}
                    margin={{top: 5, right: 10, left: 0, bottom: 5}}>
                    <XAxis dataKey="date"/>
                    <YAxis type="number" domain={[2, 'auto']} tickFormatter={(value) =>
                    //     value.toLocaleString('en-US', {
                    //     notation: "compact",
                    //     compactDisplay: "short"
                    // })
                        Numeral(value).format('0a')
                    }/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip formatter={(value) => value.toLocaleString()}/>
                    <Legend />
                    <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="deaths" name="fatalities" stroke="#ca829c"/>
                    {/*<Line type="monotone" dataKey="recovered" stroke="#82ca9d" />*/}

                    {/*<Brush*/}
                    {/*    dataKey='date'*/}
                    {/*    height={20}*/}
                    {/*    stroke="#b7b7b7"*/}
                    {/*    startIndex={15}*/}
                    {/*    // endIndex={10}*/}
                    {/*>*/}

                    {/*    <LineChart>*/}
                    {/*        <Line dataKey="cases" fill="#8884d8" />*/}
                    {/*        <Line dataKey="deaths" fill="#ca829c" />*/}
                    {/*    </LineChart>*/}

                    {/*</Brush>*/}

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TimelineGraph;
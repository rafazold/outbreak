import React, { memo } from "react";
import './Map.scss';
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import geographyObject from "./countries2"


const rounded = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else {
        return Math.round(num / 100) / 10 + "K";
    }
};

const formatName = (country) => {
    if(country === 'China') {
        return 'Mainland_China'
    }
    if(country === 'United States of America') {
        return 'US'
    }
    const nameArr = country.split(' ');
    const newArr = nameArr.map(str => {
        if (str === ' ') {
            return '_'
        }
        return str;
    });
    return newArr.join('_');

};

const Map = ({ setToolpitName, setToolpitInfected, infected, setToolpitCasualties, setToolpitRecovered }) => {
    return (
        <div className="map">
            <ComposableMap
                data-tip=""
                projectionConfig={{
                    scale: 165,
                    rotation: [-11, 0, 0],
                }}
                width={800}
                height={500}
                style={{ width: "auto", height: "auto" }}
            >
                <ZoomableGroup>
                    <Geographies geography={geographyObject} disableoptimization="true">
                        {({geographies}) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const { NAME } = geo.properties;
                                        const getValue = (dataType) => {
                                            if (typeof infected[(geo.properties.ISO_A2)] !== "undefined") {
                                                return infected[(geo.properties.ISO_A2)][dataType].toLocaleString();
                                            } else if (typeof infected[(geo.properties.WB_A2)] !== "undefined") {
                                                return infected[(geo.properties.WB_A2)][dataType].toLocaleString();
                                            }
                                            return 0;
                                        };

                                        setToolpitName(`${NAME}`);
                                        setToolpitInfected(`infected: ${getValue("cases")}`);
                                        setToolpitCasualties(`casualties: ${getValue("deaths")}`);
                                        setToolpitRecovered(`recovered: ${getValue("recovered")}`)
                                    }}
                                    onMouseLeave={() => {
                                        setToolpitName("Total");
                                        setToolpitInfected(`infected: ${infected.totals.cases.toLocaleString()}`);
                                        setToolpitCasualties(`casualties: ${infected.totals.deaths.toLocaleString()}`)
                                        setToolpitRecovered(`recovered: ${infected.totals.recovered.toLocaleString()}`)
                                    }}
                                    style={{
                                        default: {
                                            fill: "#999",
                                            stroke: "#FFF",
                                            strokeWidth: 0.5,
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: "#565b80",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#797979",
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default memo(Map);
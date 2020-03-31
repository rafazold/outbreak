import React, { memo, useState } from "react";
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





const Map = ({ setTooltipGeo, setTooltipInfected, countriesObject, setTooltipCasualties, setTooltipRecovered }) => {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    const handleZoomIn = () => {
        if (position.zoom >= 4) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.1 }));
    }

    const handleZoomOut = () => {
        if (position.zoom / 1.1 <= 1) {
            setPosition(pos => ({ ...pos, zoom: 1 }));
            return
        }
        setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.1 }));
    };

    const handleWheel = (event) => {
        event.preventDefault();

        if (event.deltaY > 0) {
            event.preventDefault();
            handleZoomOut()
        }
        if (event.deltaY < 0) {
            event.preventDefault();
            handleZoomIn()
        }
    }

    const handleMouseEnter =  (geo, dataObj) => {
        const getValueFromCountryObject = (dataType, dataObj, geo) => {
            if (typeof dataObj[(geo.properties.ISO_A2)] !== "undefined") {
                return dataObj[(geo.properties.ISO_A2)][dataType].toLocaleString();
            } else if (typeof dataObj[(geo.properties.WB_A2)] !== "undefined") {
                return dataObj[(geo.properties.WB_A2)][dataType].toLocaleString();
            }
            return 0;
        };

        const { NAME } = geo.properties;
        setTooltipGeo(`${NAME}`);
        setTooltipInfected(`infected: ${getValueFromCountryObject("cases", dataObj, geo)}`);
        setTooltipCasualties(`casualties: ${getValueFromCountryObject("deaths", dataObj, geo)}`);
        setTooltipRecovered(`recovered: ${getValueFromCountryObject("recovered", dataObj, geo)}`)
    }
    const handleMouseLeave = (dataObj) => {
        setTooltipGeo("Total");
        setTooltipInfected(`infected: ${typeof dataObj.totals.cases !== 'undefined' ? dataObj.totals.cases.toLocaleString() : 0}`);
        setTooltipCasualties(`casualties: ${dataObj.totals.deaths ? dataObj.totals.deaths.toLocaleString() : 0}`)
        setTooltipRecovered(`recovered: ${ dataObj.totals.recovered ? dataObj.totals.recovered.toLocaleString() : 0}`)
    }

    const lockScroll = () => {
        document.body.classList.add("lock-scroll")
    };
    const allowScroll = () => {
        document.body.classList.remove("lock-scroll")
    };

    return (


        <div className="map" onMouseEnter={lockScroll} onMouseLeave={allowScroll}>
                <ComposableMap
                    data-tip=""
                    width={800}
                    height={500}
                    style={{ width: "auto", height: "auto" }}
                >
                <ZoomableGroup
                    zoom={position.zoom}
                    center={position.coordinates}
                    

                >
                    <Geographies geography={geographyObject} >
                        {({geographies}) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onWheel={handleWheel}
                                    onMouseEnter={() => handleMouseEnter(geo, countriesObject)}
                                    onMouseLeave={() => handleMouseLeave(countriesObject)}
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
import React, { memo, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './Map.scss';
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography, Marker
} from "react-simple-maps";
import geographyObject from "./countries"
import getValueFromCountryObject from "../../helpers/getValuesFromCountryObject"

const Map = ({ setTooltipGeo, setTooltipInfected, countriesObject, setTooltipCasualties, setTooltipRecovered }) => {
    const [position, setPosition] = useState({ coordinates: [20, 0], zoom: 1 });


    const handleZoomIn = () => {
        if (position.zoom >= 4) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.1 }));
    };

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
    };

    const handleMouseEnter =  (geo, dataObj) => {
        // const getValueFromCountryObject = (dataType, dataObj, geo) => {
        //     if (typeof dataObj[(geo.properties.ISO_A2)] !== "undefined") {
        //         return dataObj[(geo.properties.ISO_A2)][dataType].toLocaleString();
        //     } else if (typeof dataObj[(geo.properties.WB_A2)] !== "undefined") {
        //         return dataObj[(geo.properties.WB_A2)][dataType].toLocaleString();
        //     }
        //     return 0;
        // };

        const { NAME } = geo.properties;
        setTooltipGeo(`${NAME}`);
        setTooltipInfected(`cases: ${getValueFromCountryObject("cases", dataObj, geo).toLocaleString()}`);
        setTooltipCasualties(`fatalities: ${getValueFromCountryObject("deaths", dataObj, geo).toLocaleString()}`);
        setTooltipRecovered(`recovered: ${getValueFromCountryObject("recovered", dataObj, geo).toLocaleString()}`)
    };
    const handleMouseLeave = (dataObj) => {
        setTooltipGeo("Total");
        setTooltipInfected(`cases: ${typeof dataObj.totals.cases !== 'undefined' ? dataObj.totals.cases.toLocaleString() : 0}`);
        setTooltipCasualties(`fatalities: ${dataObj.totals.deaths ? dataObj.totals.deaths.toLocaleString() : 0}`);
        setTooltipRecovered(`recovered: ${ dataObj.totals.recovered ? dataObj.totals.recovered.toLocaleString() : 0}`);
    };

    const handleClick = (geo, dataObj) => {
        const { NAME } = geo.properties;
        console.log(`${NAME}: ${getValueFromCountryObject('casesPerOneMillion', dataObj, geo)}`)
    };

    const handleTouch = (e) => {
        // console.log(e.changedTouches[0])
    };

    // const handleMoveEnd = (position) => {
    //     console.log(position);
    //     setPosition(position);
    // }

    function handleMoveEnd(position) {
        console.log('aa', position)
        setPosition(position);
        console.log('bb', position)
    }

    const lockScroll = () => {
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        // if (width > 800) {
            document.body.classList.add("lock-scroll")
        // }
    };
    const allowScroll = () => {
        document.body.classList.remove("lock-scroll")
    };

    const geoColor = (geo) => {
        const casesPerMillion = getValueFromCountryObject('casesPerOneMillion', countriesObject, geo);
        if (casesPerMillion > 1000) {
            return '#FF0D3E'
        } else if (casesPerMillion > 500) {
            return '#FF5211'
        } else if (casesPerMillion > 100) {
            return '#F6A73F'
        } else if (casesPerMillion > 10) {
            return '#ECD1AE'
        } else {
            return '#999999'
        }
    };

    return (


        <div className="map" onMouseEnter={lockScroll} onMouseLeave={allowScroll} onTouchEnd={handleTouch} onTouchStart={handleTouch}>
            <TransformWrapper className="map1">
                <TransformComponent>
                    <ComposableMap
                        // data-tip=""
                        width={800}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                    >
                    <ZoomableGroup
                        zoom={position.zoom}
                        center={position.coordinates}
                        // onMoveEnd={handleMoveEnd}
                        // onMoveStart={lockScroll}

                    >
                        <Geographies
                            data-tip=""
                            geography={geographyObject}
                        >
                            {({geographies}) =>
                                geographies.map(geo => (

                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onWheel={handleWheel}
                                        onMouseEnter={() => handleMouseEnter(geo, countriesObject)}
                                        onClick={() => handleClick(geo, countriesObject)}
                                        onMouseLeave={() => handleMouseLeave(countriesObject)}
                                        style={{
                                            default: {
                                                fill: geoColor(geo),
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
                        {/*{console.log(countriesObject)}*/}
                        {/*{Object.values(countriesObject).map(geo => {*/}
                        {/*    // if ()*/}
                        {/*    if (geo.countryInfo) {*/}
                        {/*        return (*/}
                        {/*        <Marker coordinates={[geo.countryInfo.long, geo.countryInfo.lat]}>*/}
                        {/*        <circle r={5} fill="#F53" opacity={`20%`}/>*/}
                        {/*    </Marker>)}*/}

                        {/*})}*/}
                        {/*{Object.values(countriesObject).map(x => console.log(x))}*/}
                    </ZoomableGroup>
                </ComposableMap>
            </TransformComponent>
            </TransformWrapper>
        </div>

    );
};

export default memo(Map);
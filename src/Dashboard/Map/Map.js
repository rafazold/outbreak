import React, { memo, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './Map.scss';
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
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
        const { NAME } = geo.properties;
        const cases = getValueFromCountryObject("cases", dataObj, geo);
        const fatalities = getValueFromCountryObject("deaths", dataObj, geo);
        const recovered = getValueFromCountryObject("recovered", dataObj, geo);
        setTooltipGeo(`${NAME}`);
        setTooltipInfected(`cases: ${cases.toLocaleString()}`);
        setTooltipCasualties(`fatalities: ${fatalities.toLocaleString()} (${Math.round(fatalities/cases*100).toLocaleString()}%)`);
        setTooltipRecovered(`recovered: ${recovered.toLocaleString()} (${Math.round(recovered/cases*100).toLocaleString()}%)`)
    };
    const handleMouseLeave = () => {
        setTooltipGeo('');
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


        <div className="map" >
            <TransformWrapper className="map1">
                <TransformComponent>
                    <ComposableMap
                        // data-tip=""
                        width={800}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                    >
                    <ZoomableGroup
                        disablePanning={true}
                        zoom={position.zoom}
                        center={position.coordinates}
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
                                        onMouseLeave={() => handleMouseLeave(countriesObject)}
                                        onTouchStart={() => handleMouseEnter(geo, countriesObject)}
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
                    </ZoomableGroup>
                </ComposableMap>
            </TransformComponent>
            </TransformWrapper>
        </div>

    );
};

export default memo(Map);
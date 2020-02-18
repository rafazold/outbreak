import React, { memo } from "react";
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

const Map = ({ setTooltipContent }) => {
    return (
        <div className="map">
            <ComposableMap
                data-tip=""
                projectionConfig={{
                    scale: 155,
                    rotation: [-11, 0, 0],
                }}
                width={800}
                height={400}
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
                                        const { NAME, POP_EST } = geo.properties;
                                        console.log(geo.properties.Name)
                                        setTooltipContent(`${NAME}`);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#797979",
                                            stroke: "#FFF",
                                            strokeWidth: 0.5,
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: "#999",
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
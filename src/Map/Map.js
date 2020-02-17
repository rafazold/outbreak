

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

const MapChart = ({ setTooltipContent }) => {
  return (
    <div className="map">
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geographyObject} disableoptimization="true">
            {({geographies}) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
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

export default memo(MapChart);


/*

import React, { Component } from "react"
import { scaleLinear } from "d3-scale"
// If you want to use an object instead of requesting a file:
import geographyObject from "./countries2"
import "./Map.scss"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"

const colorScale = scaleLinear()
    .domain([0, 100000000, 1338612970]) // Max is based on China
    .range(["#FFF176", "#FFC107", "#E65100"])

class ChoroplethMap extends Component {
    constructor() {
        super()

        this.state = {
            zoom: 1,
        }

        this.handleZoomIn = this.handleZoomIn.bind(this)
        this.handleZoomOut = this.handleZoomOut.bind(this)
    }
    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom * 2,
        })
    }
    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom / 2,
        })
    }
    handleMoveStart(currentCenter) {
        console.log("New center: ", currentCenter)
    }

    handleMoveEnd(newCenter) {
        console.log("New center: ", newCenter)
    }

    render() {
        return (
            <div className="Map">
                <button onClick={ this.handleZoomIn }>{ "Zoom in" }</button>
                <button onClick={ this.handleZoomOut }>{ "Zoom out" }</button>
                <ComposableMap style={{ width: "60%" }}>
                    <ZoomableGroup
                        zoom={ this.state.zoom }
                        onMoveStart={this.handleMoveStart}
                        onMoveEnd={this.handleMoveEnd}
                    >
                        <Geographies geography={ geographyObject } disableOptimization>
                            {(geographies, projection) => geographies.map((geography, i) => (
                                <Geography
                                    key={ `geography-${i}` }
                                    cacheId={ `geography-${i}` }
                                    geography={ geography }
                                    projection={ projection }
                                    style={{
                                        default: {
                                            fill: "#797979",
                                            stroke: "#FFF",
                                            strokeWidth: 0.5,
                                            outline: "none",
                                        },
                                        hover:   { fill: "#999" },
                                        pressed: { fill: "#797979" },
                                    }}
                                />
                            ))}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        )
    }
}

export default ChoroplethMap

*/
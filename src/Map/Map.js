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
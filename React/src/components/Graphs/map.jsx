import DT from "./world-50m.json";
import CT from "./world-most-populous-cities.json";
import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

const cityScale = scaleLinear()
  .domain([0, 10])
  .range([1, 15]);

class BasicMap extends Component {
  state = { cities: [], data: this.props.data };
  componentDidMount() {
    this.fetchCities();
  }
  fetchCities() {
    console.log(DT, "ghjfkldsa");
  }
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ scale: 200 }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography={DT}>
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          hover: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          }
                        }}
                      />
                    )
                )
              }
            </Geographies>
            <Markers>
              {this.state.data.map((city, i) => (
                <Marker key={i} marker={city}>
                  <circle
                    cx={0}
                    cy={0}
                    r={cityScale(city.population)}
                    fill="rgba(255,87,34,0.8)"
                    stroke="#607D8B"
                    strokeWidth="2"
                  />
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default BasicMap;

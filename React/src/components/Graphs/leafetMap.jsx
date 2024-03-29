import React, { Component } from "react";
import { Map, CircleMarker, TileLayer, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
let data = {
  city: [
    { name: "Tokyo", coordinates: [139.6917, 35.6895], population: 37843000 },
    { name: "Jakarta", coordinates: [106.865, -6.1751], population: 30539000 },
    { name: "Delhi", coordinates: [77.1025, 28.7041], population: 24998000 },
    { name: "Seoul", coordinates: [126.978, 37.5665], population: 23480000 },
    {
      name: "Shanghai",
      coordinates: [121.4737, 31.2304],
      population: 23416000
    },
    { name: "Karachi", coordinates: [67.0099, 24.8615], population: 22123000 },
    { name: "Beijing", coordinates: [116.4074, 39.9042], population: 21009000 },
    { name: "Mumbai", coordinates: [72.8777, 19.076], population: 17712000 },
    { name: "Osaka", coordinates: [135.5022, 34.6937], population: 17444000 },
    { name: "Moscow", coordinates: [37.6173, 55.7558], population: 16170000 },
    { name: "Dhaka", coordinates: [90.4125, 23.8103], population: 15669000 },
    { name: "Bangkok", coordinates: [100.5018, 13.7563], population: 14998000 },
    { name: "Kolkata", coordinates: [88.3639, 22.5726], population: 14667000 },
    { name: "Istanbul", coordinates: [28.9784, 41.0082], population: 13287000 }
  ],
  minLat: -6.1751,
  maxLat: 55.7558,
  minLong: 37.6173,
  maxLong: 139.6917
};
class LeafetMap extends Component {
  render() {
    var centerLat = (data.minLat + data.maxLat) / 2;
    var distanceLat = data.maxLat - data.minLat;
    var bufferLat = distanceLat * 0.05;
    var centerLong = (data.minLong + data.maxLong) / 2;
    var distanceLong = data.maxLong - data.minLong;
    var bufferLong = distanceLong * 0.15;
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Trends map</h3>
        <Map
          style={{
            height: "720px",
            width: "100%",
            color: "#255255000"
          }}
          zoom={0}
          center={[centerLat, centerLong]}
          bounds={[
            [data.minLat - bufferLat, data.minLong - bufferLong],
            [data.maxLat + bufferLat, data.maxLong + bufferLong]
          ]}
        >
          <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" />

          {data.city.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["coordinates"][1], city["coordinates"][0]]}
                radius={20 * Math.log(city["population"] / 10000000)}
                fillOpacity={0.5}
                stroke={true}
                color="#ccc"
              >
                <Popup>
                  <a href="/home">
                    <span style={{ display: "block" }}>
                      {city["name"] +
                        ": " +
                        "Population" +
                        " " +
                        city["population"]}
                      <br />
                    </span>
                  </a>
                </Popup>
              </CircleMarker>
            );
          })}
        </Map>
      </div>
    );
  }
}

export default LeafetMap;

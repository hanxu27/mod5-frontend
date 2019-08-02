import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactMap, { Marker, Popup } from "react-map-gl";

// import { mapboxApiAccessToken, mapStyle } from "../apikeys";
import "mapbox-gl/src/css/mapbox-gl.css";

import ParkCard from "./ParkCard";
import { getLat, getLong } from "../actions/parkActions";
import { displayParks } from "../actions/parkActions";

const Map = props => {
  const [viewport, setViewport] = useState({
    latitude: 38.560954,
    longitude: -98.93524,
    zoom: 4,
    width: "100vw",
    height: "93.9vh"
  });

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const listener = e => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  const parkMarker = park => {
    return (
      <Marker key={park.id} latitude={getLat(park)} longitude={getLong(park)}>
        <button className="marker-btn" onClick={e => setSelected(park)}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1d/US-NationalParkService-Logo.svg"
            alt="Park Logo"
          />
        </button>
      </Marker>
    );
  };

  return (
    <div>
      <ReactMap
        {...viewport}
        mapboxApiAccessToken={process.env.mapboxApiAccessToken}
        mapStyle={process.env.mapStyle}
        onViewportChange={viewport => setViewport(viewport)}
        minZoom={4}
        maxZoom={10}
      >
        {displayParks(props.parks, props.search).map(parkMarker)}
        {selected && (
          <Popup
            latitude={getLat(selected)}
            longitude={getLong(selected)}
            onClose={() => setSelected(null)}
            style={{ borderRadius: "10px" }}
          >
            <ParkCard park={selected} />
          </Popup>
        )}
      </ReactMap>
    </div>
  );
};

let mapStateToProps = state => ({
  parks: state.park.parks,
  search: state.park.search
});
export default connect(mapStateToProps)(Map);

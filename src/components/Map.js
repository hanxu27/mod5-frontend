import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactMap, { Marker, Popup } from "react-map-gl";
import { Container } from "react-bootstrap";

// import { mapboxApiAccessToken, mapStyle } from "../apikeys";
import "mapbox-gl/src/css/mapbox-gl.css";

import ParkCard from "./ParkCard";
import { getLat, getLong } from "../actions/parkActions";
import { displayParks } from "../actions/parkActions";

const Map = props => {
  const [viewport, setViewport] = useState({
    latitude: 38.560954,
    longitude: -98.93524,
    zoom: 3,
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
        // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
        // mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        mapboxApiAccessToken="pk.eyJ1IjoiaGFueHUyNyIsImEiOiJjanh1ajF5bTIxNXZhM2xyczF4cXN4ZjJqIn0.058kHvghPXmU2LOnp_9bwA"
        mapStyle="mapbox://styles/hanxu27/cjyswl9mc0yu71coh09kbmaql"
        onViewportChange={viewport => setViewport(viewport)}
        minZoom={3}
        maxZoom={8}
      >
        {displayParks(props.parks, props.search).map(parkMarker)}
        {selected && (
          <Popup
            latitude={getLat(selected)}
            longitude={getLong(selected)}
            onClose={() => setSelected(null)}
          >
            <Container>
              <ParkCard park={selected} />
            </Container>
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

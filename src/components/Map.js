import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactMap, { Marker, Popup } from "react-map-gl";

import "mapbox-gl/src/css/mapbox-gl.css";

import ParkCard from "./ParkCard";
import { getLat, getLong } from "../actions/parkActions";
import { displayParks } from "../actions/parkActions";

const Map = props => {
  const [viewport, setViewport] = useState({
    latitude: 38.560954,
    longitude: -98.93524,
    zoom: 4.5,
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
      <Marker
        key={park.id}
        latitude={getLat(park) + getLat(park) * 0.0088}
        longitude={getLong(park) + getLong(park) * 0.002}
      >
        <button
          className="marker-btn"
          onClick={e => {
            e.preventDefault();
            setSelected(park);
          }}
        >
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
        mapboxApiAccessToken="pk.eyJ1IjoiaGFueHUyNyIsImEiOiJjanh1ajF5bTIxNXZhM2xyczF4cXN4ZjJqIn0.058kHvghPXmU2LOnp_9bwA"
        // mapStyle='mapbox://styles/hanxu27/cjxujyxc99bwq1cs1kk4duz8a'
        // mapStyle="mapbox://styles/hanxu27/cjxvx303m18ce1cqhd5dg3029"
        mapStyle="mapbox://styles/hanxu27/cjygal1fu08m81cmsxxjlb91c"
        onViewportChange={viewport => setViewport(viewport)}
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

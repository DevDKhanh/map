// import "proj4leaflet";
// import "proj4";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";

import { CRS } from "leaflet";
import L from "leaflet";
import MapDataRender from "../MapDataRender";
import { PropsMap } from "./interfaces";

function MapClient({}: PropsMap) {
  return (
    <MapContainer
      center={[17, 108]}
      zoom={6}
      scrollWheelZoom={true}
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
      // crs={CRS.EPSG3395}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapDataRender />
    </MapContainer>
  );
}

export default MapClient;

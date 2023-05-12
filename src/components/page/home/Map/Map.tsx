// import "proj4leaflet";
// import "proj4";

import { MapContainer, Marker, TileLayer, WMSTileLayer } from "react-leaflet";
import { useEffect, useState } from "react";

import { CRS } from "leaflet";
import L from "leaflet";
import MapDataRender from "../MapDataRender";
import { PropsMap } from "./interfaces";

function MapClient({}: PropsMap) {
  return (
    <MapContainer
      center={[-37.8201, 145.3443]}
      zoom={9}
      scrollWheelZoom={true}
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
      crs={CRS.EPSG3857}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapDataRender />
    </MapContainer>
  );
}

export default MapClient;

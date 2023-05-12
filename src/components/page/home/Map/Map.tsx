// import "proj4leaflet";
// import "proj4";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import { CRS } from "leaflet";
import MapDataRender from "../MapDataRender";
import { PropsMap } from "./interfaces";
import { RootState } from "~/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function MapClient({}: PropsMap) {
  const { center } = useSelector((state: RootState) => state.user);

  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={true}
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
      crs={CRS.EPSG3857}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker center={center} zoom={10} />
      <MapDataRender />
    </MapContainer>
  );
}

function LocationMarker({ center, zoom }: any) {
  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, zoom]);

  return null;
}

export default MapClient;

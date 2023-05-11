import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { PropsMap } from "./interfaces";
import styles from "./Map.module.scss";

function MapClient({}: PropsMap) {
  return (
    <MapContainer
      center={[9.975896274502997, 105.77857732772829]}
      zoom={6}
      scrollWheelZoom={true}
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[51.505, -0.09]} />
    </MapContainer>
  );
}

export default MapClient;

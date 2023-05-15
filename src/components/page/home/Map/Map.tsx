// import "proj4leaflet";
// import "proj4";

import { Fragment, useEffect, useState } from "react";
import { MapContainer, Polygon, TileLayer, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";

import { CRS } from "leaflet";
import MapDataRender from "../MapDataRender";
import { PropsMap } from "./interfaces";
import { RootState } from "~/redux/store";
import { TITLELAYER } from "~/constants/enum";
import { setDrawSearch } from "~/redux/reducer/user";

function MapClient({}: PropsMap) {
  const { center, drawSearch, isDraw, displayType } = useSelector(
    (state: RootState) => state.user
  );

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
      doubleClickZoom={false}
    >
      {displayType == TITLELAYER.Satellite ? (
        <TileLayer
          url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=PHwg3WaEcP48wFXo8LQR"
          attribution="&copy; MapTiler"
        />
      ) : null}
      {displayType == TITLELAYER.Terrain ? (
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
      ) : null}

      <LocationMarker />
      {isDraw ? (
        <Fragment>
          <Draw />
          <Polygon positions={drawSearch} />
        </Fragment>
      ) : null}
      <MapDataRender />
    </MapContainer>
  );
}

function Draw() {
  const { drawSearch, isDraw } = useSelector((state: RootState) => state.user);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();

  useMapEvents({
    click: (e) => {
      if (isDraw) {
        if (done) {
          setDone(false);
          dispatch(setDrawSearch([[e.latlng.lat, e.latlng.lng]]));
        } else {
          dispatch(
            setDrawSearch([...drawSearch, [e.latlng.lat, e.latlng.lng]])
          );
        }
      }
    },
    dblclick: () => {
      if (isDraw) {
        setDone(true);
      }
    },
  });

  useEffect(() => {
    if (isDraw) {
      const handleKeyDown = (event: any) => {
        if (event.ctrlKey && event.key === "z") {
          dispatch(setDrawSearch(drawSearch.slice(0, drawSearch.length - 1)));
        }
        if (event.ctrlKey && event.key === "Backspace") {
          dispatch(setDrawSearch([]));
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [drawSearch, isDraw]);
  return null;
}

function LocationMarker() {
  const { baseZoom } = useSelector((state: RootState) => state.user);

  const map = useMapEvents({});

  useEffect(() => {
    if (baseZoom.center && baseZoom.zoom) {
      map.flyTo(baseZoom.center, baseZoom.zoom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseZoom]);

  return null;
}

export default MapClient;

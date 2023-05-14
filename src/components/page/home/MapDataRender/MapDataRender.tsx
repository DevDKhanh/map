import { Fragment, memo, useEffect, useMemo, useState } from "react";
import { GeoJSON, useMapEvents } from "react-leaflet";

import L from "leaflet";
import { PropsMapDataRender } from "./interfaces";
import { RootState } from "~/redux/store";
import Vector from "~/components/common/Layer/Vector";
import axiosClient from "~/components/services";
import { listFile } from "~/constants";
import { useSelector } from "react-redux";

const getInfo = (data: any) => {
  const info = [];
  for (let i in data) {
    info.push(`<div>
              <p>
                  <b>${i}: </b> ${data[i]}
              </p>
          </div>`);
  }
  return info;
};

function MapDataRender({}: PropsMapDataRender) {
  const [reset, setReset] = useState(false);
  const [resetAll, setResetAll] = useState(false);
  const [colorFocus, setColorFocus] = useState<any>(null);
  const { listDisplayLayer, layerFocus, isDraw } = useSelector(
    (state: RootState) => state.user
  );

  const map = useMapEvents({});

  const focus = useMemo(() => {
    if (layerFocus && colorFocus) {
      const icon = new L.Icon({
        iconUrl: `/Point-fc.png`,
        iconSize: [26, 26],
        popupAnchor: [0, -15],
        shadowAnchor: [13, 28],
      });

      const handleCustomMarker = (feature: any, latlng: any) => {
        return L.marker(latlng, {
          icon,
        });
      };

      const handleEachInfo = (info: any, layer: any) => {
        if (layer.feature.geometry.type == "Point") {
          map.flyTo(
            [
              layer.feature.geometry.coordinates[1],
              layer.feature.geometry.coordinates[0],
            ],
            18
          );
        } else {
          const bounds = layer.getBounds(); // Lấy giới hạn (bounds) của đối tượng
          if (bounds.isValid()) {
            if (map) {
              map.fitBounds(bounds); // Zoom vào giới hạn của đối tượng
            }
          }
        }

        if (isDraw) {
          return;
        }

        const { properties } = info;
        layer.bindPopup(getInfo(properties).join(""));
      };

      const handleStyleFocus: any = (info: any, layer: any) => {
        const { properties } = info;
        const style = colorFocus.find((x: any) => x.Name == properties.NAME);

        return {
          color: "red",
          opacity: 1,
          weight: 4,
          fillOpacity: 0.8,
          fillColor: style?.PolygonSymbolizer?.Fill?.SvgParameter,
        };
      };

      return (
        <GeoJSON
          pointToLayer={handleCustomMarker}
          data={layerFocus}
          style={handleStyleFocus}
          onEachFeature={handleEachInfo}
        />
      );
    } else {
      return null;
    }
  }, [colorFocus, isDraw, layerFocus, map]);

  const render = useMemo(() => {
    return listDisplayLayer.map((item) => {
      const data = listFile.find((x) => x.id == item);
      if (data)
        return (
          <Vector
            key={data?.id}
            path={data?.path}
            pathColor={data?.pathColor}
            type={data?.type}
            id={data?.id}
          />
        );
      else return null;
    });
  }, [listDisplayLayer]);

  useEffect(() => {
    setResetAll(false);
  }, [isDraw]);

  useEffect(() => {
    if (!resetAll) {
      setResetAll(true);
    }
  }, [resetAll]);

  useEffect(() => {
    setReset(false);
  }, [layerFocus]);

  useEffect(() => {
    if (!reset) {
      setReset(true);
    }
  }, [reset]);

  useEffect(() => {
    (async () => {
      const res: any = await axiosClient.get("/vic_admin.json");
      setColorFocus(
        res?.StyledLayerDescriptor.NamedLayer.UserStyle.FeatureTypeStyle?.Rule
      );
    })();
  }, []);

  return (
    <Fragment>
      {reset ? focus : null}
      {resetAll ? render : null}
    </Fragment>
  );
}

export default memo(MapDataRender);

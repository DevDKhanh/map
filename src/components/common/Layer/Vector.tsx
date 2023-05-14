import { GeoJSON, useMap, useMapEvents } from "react-leaflet";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import L from "leaflet";
import { RootState } from "~/redux/store";
import axiosClient from "~/components/services";
import { setData } from "~/redux/reducer/user";

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

function Vector({
  path,
  pathColor,
  type,
  id,
}: {
  path: string;
  pathColor?: string;
  type: string;
  id: number;
}) {
  const { isDraw, data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState<any>(null);
  const [color, setColor] = useState<any>(null);

  const icon = new L.Icon({
    iconUrl: `/point.png`,
    iconSize: [26, 26],
    popupAnchor: [0, -15],
    shadowAnchor: [13, 28],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  });

  useEffect(() => {
    if (path) {
      (async () => {
        const res = await axiosClient.get(path);
        setFile(res);
        dispatch(
          setData({
            ...data,
            [id]: res,
          })
        );

        if (pathColor) {
          const res: any = await axiosClient.get(pathColor);
          setColor(
            res.StyledLayerDescriptor.NamedLayer.UserStyle.FeatureTypeStyle
          );
        }
      })();
    }
  }, [path, pathColor, id, dispatch]);

  const handleEachInfo = (info: any, layer: any) => {
    if (isDraw) return;

    const { properties } = info;
    return layer.bindPopup(getInfo(properties).join(""));
  };

  const handleCustomMarker = (feature: any, latlng: any) => {
    return L.marker(latlng, {
      icon,
    });
  };

  const style: any = useCallback(
    (info: any, layer: any) => {
      const { properties } = info;

      if (!pathColor || !color) {
        return {};
      }

      const style = color?.Rule.find(
        (x: any) => x.Name == properties.NAME || x.Name == properties.LOCAL_TYPE
      );
      if (style) {
        if (type == "MultiLineString") {
          return {
            color: style?.LineSymbolizer?.Stroke?.SvgParameter?.[0],
            opacity: 1,
            weight: 2,
            fillOpacity: 1,
            fillColor: style?.LineSymbolizer?.Stroke?.SvgParameter?.[0],
          };
        } else {
          return {
            color: style?.PolygonSymbolizer?.Fill?.SvgParameter,
            opacity: "",
            weight: 1,
            fillOpacity: 0.3,
            fillColor: "",
          };
        }
      } else {
        return {};
      }
    },
    [color, pathColor, type]
  );

  return (
    <>
      {file ? (
        <GeoJSON
          data={file}
          style={style}
          onEachFeature={handleEachInfo}
          pointToLayer={handleCustomMarker}
        />
      ) : null}
    </>
  );
}

export default memo(Vector);

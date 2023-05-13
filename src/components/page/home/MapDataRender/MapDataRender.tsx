import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GeoJSON, useMap } from "react-leaflet";

import { LAYERS } from "~/constants/enum";
import { PropsMapDataRender } from "./interfaces";
import { RootState } from "~/redux/store";
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
  const { data, listDisplayLayer, layerFocus, isDraw } = useSelector(
    (state: RootState) => state.user
  );

  const handleEachInfo = (info: any, layer: any) => {
    console.log("run");

    const { properties } = info;
    layer.bindPopup(getInfo(properties).join(""));
  };

  const styleAdmin: any = useCallback(
    (info: any, layer: any) => {
      const { properties } = info;
      const style = data?.vic_admin.find((x: any) => x.Name == properties.NAME);

      return {
        color: style?.PolygonSymbolizer?.Fill?.SvgParameter,
        opacity: "",
        weight: 1,
        fillOpacity: 0.3,
        fillColor: "",
      };
    },
    [data?.vic_admin]
  );

  const styleRoads: any = useCallback(
    (info: any, layer: any) => {
      const { properties } = info;
      const style = data?.vic_roads.find(
        (x: any) => x.Name == properties.LOCAL_TYPE
      );

      return {
        color: style?.LineSymbolizer?.Stroke?.SvgParameter?.[0],
        opacity: 1,
        weight: 2,
        fillOpacity: 1,
        fillColor: style?.LineSymbolizer?.Stroke?.SvgParameter?.[0],
      };
    },
    [data?.vic_roads]
  );

  const focus = useMemo(() => {
    const handleStyleFocus: any = (info: any, layer: any) => {
      const { properties } = info;
      const style = data?.vic_admin.find((x: any) => x.Name == properties.NAME);

      return {
        color: "blue",
        opacity: 1,
        weight: 3,
        fillOpacity: 0.8,
        fillColor: style?.PolygonSymbolizer?.Fill?.SvgParameter,
      };
    };

    setReset(false);
    return layerFocus ? (
      <GeoJSON
        data={layerFocus}
        style={handleStyleFocus}
        onEachFeature={handleEachInfo}
      />
    ) : null;
  }, [data?.vic_admin, layerFocus]);

  useEffect(() => {
    if (!!layerFocus) {
      setReset(true);
    }
  }, [layerFocus]);

  return (
    <Fragment>
      {reset ? focus : null}
      {listDisplayLayer.includes(LAYERS.melbourneadmin) ? (
        <GeoJSON
          data={data?.melbourneadmin}
          style={styleAdmin}
          onEachFeature={handleEachInfo}
        />
      ) : null}
      {listDisplayLayer.includes(LAYERS.roads) ? (
        <GeoJSON
          data={data?.roads}
          style={styleRoads}
          onEachFeature={handleEachInfo}
        />
      ) : null}
    </Fragment>
  );
}

export default memo(MapDataRender);

import { Fragment, useEffect, useMemo, useState } from "react";

import { GeoJSON } from "react-leaflet";
import { LAYERS } from "~/constants/enum";
import { PropsMapDataRender } from "./interfaces";
import { RootState } from "~/redux/store";
import styles from "./MapDataRender.module.scss";
import { useSelector } from "react-redux";

function MapDataRender({}: PropsMapDataRender) {
  const [reset, setReset] = useState(false);
  const { data, listDisplayLayer, layerFocus } = useSelector(
    (state: RootState) => state.user
  );

  const render = useMemo(() => {
    const styleAdmin: any = (info: any, layer: any) => {
      const { properties } = info;
      const style = data.vic_admin.find((x: any) => x.Name == properties.NAME);

      return {
        color: style?.PolygonSymbolizer?.Fill?.SvgParameter,
        opacity: "",
        weight: 1,
        fillOpacity: 0.3,
        fillColor: "",
      };
    };
    const styleRoads: any = (info: any, layer: any) => {
      const { properties } = info;
      const style = data.vic_roads.find(
        (x: any) => x.Name == properties.LOCAL_TYPE
      );

      return {
        color: style?.LineSymbolizer?.Stroke?.SvgParameter?.[0],
        opacity: 1,
        weight: 1,
        fillOpacity: 1,
        fillColor: style?.LineSymbolizer?.Stroke?.SvgParameter?.[0],
      };
    };
    return (
      <Fragment>
        {!!data?.melbourneadmin &&
        listDisplayLayer.includes(LAYERS.melbourneadmin) ? (
          <GeoJSON data={data.melbourneadmin} style={styleAdmin} />
        ) : null}
        {!!data?.roads && listDisplayLayer.includes(LAYERS.roads) ? (
          <GeoJSON data={data.roads} style={styleRoads} />
        ) : null}
      </Fragment>
    );
  }, [
    data.melbourneadmin,
    data.roads,
    data.vic_admin,
    data.vic_roads,
    listDisplayLayer,
  ]);

  const focus = useMemo(() => {
    const handleStyleFocus: any = (info: any, layer: any) => {
      const { properties } = info;
      const style = data.vic_admin.find((x: any) => x.Name == properties.NAME);

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
      <GeoJSON data={layerFocus} style={handleStyleFocus} />
    ) : null;
  }, [data.vic_admin, layerFocus]);

  useEffect(() => {
    if (!!layerFocus) {
      setReset(true);
    }
  }, [layerFocus]);

  return (
    <Fragment>
      {reset ? focus : null}
      {render}
    </Fragment>
  );
}

export default MapDataRender;

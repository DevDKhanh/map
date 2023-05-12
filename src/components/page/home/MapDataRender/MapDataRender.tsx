import { GeoJSON } from "react-leaflet";
import { PropsMapDataRender } from "./interfaces";
import { RootState } from "~/redux/store";
import styles from "./MapDataRender.module.scss";
import { useSelector } from "react-redux";

function MapDataRender({}: PropsMapDataRender) {
  const { data } = useSelector((state: RootState) => state.user);

  return (
    <div>
      {!!data?.melbourneadmin ? (
        <GeoJSON key={data.melbourneadmin} data={data.melbourneadmin} />
      ) : null}
    </div>
  );
}

export default MapDataRender;

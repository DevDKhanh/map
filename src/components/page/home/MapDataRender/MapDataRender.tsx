import { GeoJSON } from "react-leaflet";
import { PropsMapDataRender } from "./interfaces";
import { RootState } from "~/redux/store";
import styles from "./MapDataRender.module.scss";
import { useSelector } from "react-redux";

function MapDataRender({}: PropsMapDataRender) {
  const { data } = useSelector((state: RootState) => state.user);
  console.log(data);

  return (
    <div>
      {!!data?.roads ? <GeoJSON key={data.roads} data={data.roads} /> : null}
    </div>
  );
}

export default MapDataRender;

import { LAYERS, TITLELAYER } from "~/constants/enum";
import { memo, useState } from "react";
import {
  setBaseZoom,
  setDisplayLayer,
  setDisplayType,
} from "~/redux/reducer/user";
import { useDispatch, useSelector } from "react-redux";

import { FaLayerGroup } from "react-icons/fa";
import { PropsLayerPanel } from "./interfaces";
import { RiHome7Fill } from "react-icons/ri";
import { RootState } from "~/redux/store";
import Tippy from "@tippyjs/react/headless";
import TippyHeadless from "@tippyjs/react/headless";
import { listFile } from "~/constants";
import styles from "./LayerPanel.module.scss";

const layer = [
  {
    value: TITLELAYER.No,
    title: "None",
  },
  {
    value: TITLELAYER.Terrain,
    title: "OpenStreet map",
  },
  {
    value: TITLELAYER.Satellite,
    title: "Satellite",
  },
];

function LayerPanel({}: PropsLayerPanel) {
  const dispatch = useDispatch();
  const { listDisplayLayer, displayType } = useSelector(
    (state: RootState) => state.user
  );
  const [showMenu, setShowMenu] = useState(false);

  const handleDisplayLayer = (e: any, name: any) => {
    const { checked } = e.target;
    if (!checked) {
      dispatch(setDisplayLayer(listDisplayLayer.filter((x) => x != name)));
    } else {
      dispatch(setDisplayLayer([...listDisplayLayer, name]));
    }
  };

  const handleDisplayType = (e: any) => {
    dispatch(setDisplayType(e.target.name));
  };

  return (
    <div>
      <TippyHeadless
        maxWidth={"100%"}
        interactive
        visible={showMenu}
        placement="bottom-end"
        render={(attrs) => (
          <div className={styles.menu}>
            <p className={styles.title}>Basemap</p>
            {layer.map((v, i) => (
              <label className={styles.item} key={i}>
                <input
                  type="radio"
                  name={`${v.value}`}
                  checked={displayType == v.value}
                  onChange={handleDisplayType}
                />
                <p>{v.title}</p>
              </label>
            ))}
            <br />
            <p className={styles.title}>Layers</p>
            {listFile.map((v) => (
              <label className={styles.item} key={v.id}>
                <input
                  type="checkbox"
                  name={`${v.id}`}
                  checked={listDisplayLayer.includes(v.id)}
                  onChange={(e) => {
                    handleDisplayLayer(e, v.id);
                  }}
                />
                <p>{v.title}</p>
              </label>
            ))}
          </div>
        )}
      >
        <div
          className={styles.option}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <FaLayerGroup />
        </div>
      </TippyHeadless>
      <Tippy content="Return to the initial position">
        <div
          className={styles.home}
          onClick={() => {
            dispatch(setBaseZoom({ center: [-37.8201, 145.3443], zoom: 10 }));
          }}
        >
          <RiHome7Fill />
        </div>
      </Tippy>
    </div>
  );
}

export default memo(LayerPanel);

import { LAYERS, TITLELAYER } from "~/constants/enum";
import { memo, useState } from "react";
import { setDisplayLayer, setDisplayType } from "~/redux/reducer/user";
import { useDispatch, useSelector } from "react-redux";

import { FaLayerGroup } from "react-icons/fa";
import { PropsLayerPanel } from "./interfaces";
import { RootState } from "~/redux/store";
import TippyHeadless from "@tippyjs/react/headless";
import styles from "./LayerPanel.module.scss";

const base = [
  {
    value: LAYERS.melbourneadmin,
    title: "Melbourne Admin Layer",
  },
  {
    value: LAYERS.roads,
    title: "Roads Layer",
  },
];

const layer = [
  {
    value: TITLELAYER.Terrain,
    title: "Terrain",
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
            <p className={styles.title}>Layer type</p>
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
            {base.map((v, i) => (
              <label className={styles.item} key={i}>
                <input
                  type="checkbox"
                  name={`${v.value}`}
                  checked={listDisplayLayer.includes(v.value)}
                  onChange={(e) => {
                    handleDisplayLayer(e, v.value);
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
    </div>
  );
}

export default memo(LayerPanel);

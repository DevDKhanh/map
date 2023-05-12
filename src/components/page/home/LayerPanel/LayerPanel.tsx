import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaLayerGroup } from "react-icons/fa";
import { LAYERS } from "~/constants/enum";
import { PropsLayerPanel } from "./interfaces";
import { RootState } from "~/redux/store";
import TippyHeadless from "@tippyjs/react/headless";
import { setDisplayLayer } from "~/redux/reducer/user";
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

function LayerPanel({}: PropsLayerPanel) {
  const dispatch = useDispatch();
  const { listDisplayLayer } = useSelector((state: RootState) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  const handleDisplayLayer = (name: any) => {
    if (listDisplayLayer.includes(name)) {
      dispatch(setDisplayLayer(listDisplayLayer.filter((x) => x != name)));
    } else {
      dispatch(setDisplayLayer([...listDisplayLayer, name]));
    }
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
            <p className={styles.title}>Layers</p>
            {base.map((v, i) => (
              <label className={styles.item} key={i}>
                <input
                  type="checkbox"
                  name={`${v.value}`}
                  checked={listDisplayLayer.includes(v.value)}
                  onChange={() => {
                    handleDisplayLayer(v.value);
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

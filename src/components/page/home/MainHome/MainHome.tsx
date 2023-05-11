import { useEffect, useState } from "react";

import { IoOptions } from "react-icons/io5";
import MapDataRender from "../MapDataRender";
import { PropsMainHome } from "./interfaces";
import { RiSearchLine } from "react-icons/ri";
import TippyHeadless from "@tippyjs/react/headless";
import dynamic from "next/dynamic";
import styles from "./MainHome.module.scss";

const MapClient = dynamic(() => import("../Map"), { ssr: false });

function MainHome({}: PropsMainHome) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.container}>
      <TippyHeadless
        maxWidth={"100%"}
        interactive
        visible={showMenu}
        placement="bottom"
        render={(attrs) => (
          <div className={styles.menu}>
            <div className={styles.search}>
              <input placeholder="Tìm kiếm..." />
              <div className={styles.icon}>
                <RiSearchLine />
              </div>
            </div>
            <div className={styles.item}></div>
          </div>
        )}
      >
        <div
          className={styles.option}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <IoOptions />
        </div>
      </TippyHeadless>
      <MapClient />
    </div>
  );
}

export default MainHome;

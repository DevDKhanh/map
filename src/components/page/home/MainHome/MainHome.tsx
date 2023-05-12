import { useEffect, useMemo, useState } from "react";

import { IoOptions } from "react-icons/io5";
import MapDataRender from "../MapDataRender";
import { PropsMainHome } from "./interfaces";
import { RiSearchLine } from "react-icons/ri";
import { RootState } from "~/redux/store";
import TippyHeadless from "@tippyjs/react/headless";
import dynamic from "next/dynamic";
import { removeVietnameseTones } from "~/common/func/optionConvert";
import styles from "./MainHome.module.scss";
import useDebounce from "~/common/hooks/useDebounce";
import { useSelector } from "react-redux";

const MapClient = dynamic(() => import("../Map"), { ssr: false });

function MainHome({}: PropsMainHome) {
  const { data } = useSelector((state: RootState) => state.user);
  const [keyword, setKeyword] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const debounce = useDebounce(keyword, 500);

  const list: any[] = useMemo(() => {
    if (debounce.trim() == "") {
      return [];
    }

    const admindata = data.melbourneadmin.features.filter((x: any) =>
      removeVietnameseTones(`${x?.properties?.name}`).includes(
        removeVietnameseTones(debounce.trim())
      )
    );

    const roadsdata = data.roads.features.filter((x: any) =>
      removeVietnameseTones(`${x?.properties?.local_name}`).includes(
        removeVietnameseTones(debounce.trim())
      )
    );

    return [...admindata, ...roadsdata];
  }, [data.melbourneadmin.features, data.roads.features, debounce]);

  console.log(list);

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
              <input
                placeholder="Tìm kiếm..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div className={styles.icon}>
                <RiSearchLine />
              </div>
            </div>

            {debounce.trim() !== "" && list.length <= 0 ? (
              <p className={styles.msg}>Không có dữ liệu!</p>
            ) : null}
            {debounce.trim() !== "" && list.length > 0 ? (
              <p className={styles.msg}>Kết quả tìm kiếm: {list.length}</p>
            ) : null}
            {/* <div className={styles.list}>
              {list.map((v: any, i: number) => (
                <div className={styles.item} key={i}>
                  <p>Name: {v.properties.name}</p>
                  <p>PFI: {v.properties.PFI}</p>
                  <p>UFI_CR: {v.properties.UFI_CR}:</p>
                </div>
              ))}
            </div> */}
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

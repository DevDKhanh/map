import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";

import { IoOptions } from "react-icons/io5";
import MapDataRender from "../MapDataRender";
import { PropsMainHome } from "./interfaces";
import { RiSearchLine } from "react-icons/ri";
import { RootState } from "~/redux/store";
import TippyHeadless from "@tippyjs/react/headless";
import dynamic from "next/dynamic";
import { removeVietnameseTones } from "~/common/func/optionConvert";
import { setCenterMap } from "~/redux/reducer/user";
import styles from "./MainHome.module.scss";
import useDebounce from "~/common/hooks/useDebounce";

const MapClient = dynamic(() => import("../Map"), { ssr: false });

function MainHome({}: PropsMainHome) {
  const limit = 7;
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  const [displayList, setDisplayList] = useState<any>([]);
  const [keyword, setKeyword] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    setPage(1);
    setDisplayList([]);
  }, [list]);

  useEffect(() => {
    setDisplayList((prev: any) => [
      ...prev,
      ...list.slice(limit * (page - 1), limit * page),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, list]);

  console.log(displayList);

  function handleScroll() {
    const div = ref.current;
    if (div) {
      if (div.scrollTop + div.clientHeight >= div.scrollHeight - 20) {
        setPage(page + 1);
      }
    }
  }

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
            {displayList.length > 0 ? (
              <div className={styles.list} ref={ref} onScroll={handleScroll}>
                {displayList.map((v: any, i: number) => (
                  <div
                    className={styles.item}
                    key={i}
                    onClick={() => {
                      dispatch(setCenterMap([10.35527, 106.107159]));
                      // dispatch(setCenterMap(v.geometry.coordinates?.[0]?.[0]))
                    }}
                  >
                    <p>
                      Name: {v.properties?.name || v.properties?.local_name}
                    </p>
                    <p>PFI: {v.properties?.PFI}</p>
                    <p>UFI_CR: {v.properties?.UFI_CR}:</p>
                  </div>
                ))}
              </div>
            ) : null}
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

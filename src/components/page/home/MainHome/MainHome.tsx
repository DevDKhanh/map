import { RiSearch2Line, RiSearchLine } from "react-icons/ri";
import { setCenterMap, setLayerFocus } from "~/redux/reducer/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";

import DrawSearch from "../DrawSearch";
import { LAYERS } from "~/constants/enum";
import LayerPanel from "../LayerPanel";
import { PropsMainHome } from "./interfaces";
import { RootState } from "~/redux/store";
import TippyHeadless from "@tippyjs/react/headless";
import dynamic from "next/dynamic";
import { removeVietnameseTones } from "~/common/func/optionConvert";
import styles from "./MainHome.module.scss";
import useDebounce from "~/common/hooks/useDebounce";

const MapClient = dynamic(() => import("../Map"), { ssr: false });

function MainHome({}: PropsMainHome) {
  const limit = 7;
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const { data, listDisplayLayer } = useSelector(
    (state: RootState) => state.user
  );
  const [displayList, setDisplayList] = useState<any>([]);
  const [keyword, setKeyword] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState(1);

  const debounce = useDebounce(keyword, 500);

  const list: any[] = useMemo(() => {
    if (debounce.trim() == "") {
      return [];
    }

    const admindata = listDisplayLayer.includes(LAYERS.melbourneadmin)
      ? data.melbourneadmin.features.filter((x: any) =>
          removeVietnameseTones(`${x?.properties?.NAME}`).includes(
            removeVietnameseTones(debounce.trim())
          )
        )
      : [];

    const roadsdata = listDisplayLayer.includes(LAYERS.roads)
      ? data.roads.features.filter((x: any) =>
          removeVietnameseTones(`${x?.properties?.NAME}`).includes(
            removeVietnameseTones(debounce.trim())
          )
        )
      : [];

    return [...admindata, ...roadsdata];
  }, [
    data.melbourneadmin.features,
    data.roads.features,
    debounce,
    listDisplayLayer,
  ]);

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
                placeholder="Search..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div className={styles.icon}>
                <RiSearchLine />
              </div>
            </div>

            {debounce.trim() !== "" && list.length <= 0 ? (
              <p className={styles.msg}>No data!</p>
            ) : null}
            {debounce.trim() !== "" && list.length > 0 ? (
              <p className={styles.msg}>Search results: {list.length}</p>
            ) : null}
            {displayList.length > 0 ? (
              <div className={styles.list} ref={ref} onScroll={handleScroll}>
                {displayList.map((v: any, i: number) => (
                  <div
                    className={styles.item}
                    key={i}
                    onClick={() => {
                      dispatch(setLayerFocus(v));

                      if (!!v.geometry.coordinates?.[0]?.[0]?.[0]?.[0])
                        dispatch(
                          setCenterMap([
                            v.geometry.coordinates?.[0]?.[0]?.[0][1],
                            v.geometry.coordinates?.[0]?.[0]?.[0][0],
                          ])
                        );
                      else {
                        if (!!v.geometry.coordinates?.[0]?.[0]?.[0])
                          dispatch(
                            setCenterMap([
                              v.geometry.coordinates?.[0]?.[0][1],
                              v.geometry.coordinates?.[0]?.[0][0],
                            ])
                          );
                      }
                    }}
                  >
                    <p>
                      Name: {v.properties?.NAME || v.properties?.local_name}
                    </p>
                    {v.properties?.PFI ? <p>PFI: {v.properties?.PFI}</p> : null}
                    {v.properties?.GAZ_LGA ? (
                      <p>GAZ_LGA: {v.properties?.GAZ_LGA}:</p>
                    ) : null}
                    {v.properties?.RD_TYPE ? (
                      <p>RD_TYPE: {v.properties?.RD_TYPE}:</p>
                    ) : null}
                    {v.properties?.RD_NUM ? (
                      <p>RD_NUM: {v.properties?.RD_NUM}:</p>
                    ) : null}
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
          <RiSearch2Line />
        </div>
      </TippyHeadless>
      <DrawSearch />
      <LayerPanel />
      <MapClient />
    </div>
  );
}

export default MainHome;

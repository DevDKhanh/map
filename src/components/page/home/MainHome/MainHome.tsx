import * as turf from "@turf/turf";

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
import clsx from "clsx";
import dynamic from "next/dynamic";
import { removeVietnameseTones } from "~/common/func/optionConvert";
import styles from "./MainHome.module.scss";
import useDebounce from "~/common/hooks/useDebounce";

const MapClient = dynamic(() => import("../Map"), { ssr: false });

function swapArrayValues(arr: any[]) {
  // Tạo mảng mới để chứa các phần tử đã được swap
  const resultArray = [];

  // Duyệt qua từng phần tử của mảng
  for (let i = 0; i < arr.length; i++) {
    // Swap giá trị của mỗi phần tử trong mảng con và thêm vào mảng mới
    resultArray.push([arr[i][1], arr[i][0]]);
  }

  return resultArray;
}

function MainHome({}: PropsMainHome) {
  const limit = 7;
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const { data, listDisplayLayer, layerFocus, drawSearch, isDraw } =
    useSelector((state: RootState) => state.user);
  const [displayList, setDisplayList] = useState<any>([]);
  const [keyword, setKeyword] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState(1);
  const [dateSearchDraw, setDataSearchDraw] = useState<any>({});
  const debounce = useDebounce(keyword, 500);

  useEffect(() => {
    if (drawSearch.length >= 3 && isDraw) {
      setShowMenu(true);
      const search: any[] = [...swapArrayValues(drawSearch)];
      search.push(swapArrayValues(drawSearch)[0]);

      if (
        data?.melbourneadmin &&
        listDisplayLayer.includes(LAYERS.melbourneadmin)
      ) {
        const featureCollection: any = turf.featureCollection(
          data.melbourneadmin.features
        );
        const polygon: any = turf.polygon([search]);
        const featuresWithin = featureCollection.features.filter(
          (feature: any) => {
            const point = turf.pointOnFeature(feature);
            return turf.booleanPointInPolygon(point, polygon);
          }
        );
        setDataSearchDraw((prev: any) => ({
          ...prev,
          melbourneadmin: featuresWithin,
        }));
      }

      if (data?.roads && listDisplayLayer.includes(LAYERS.roads)) {
        const featureCollection: any = turf.featureCollection(
          data.roads.features
        );
        const polygon: any = turf.polygon([search]);
        const featuresWithin = featureCollection.features.filter(
          (feature: any) => {
            const point = turf.pointOnFeature(feature);
            return turf.booleanPointInPolygon(point, polygon);
          }
        );
        setDataSearchDraw((prev: any) => ({
          ...prev,
          roads: featuresWithin,
        }));
      }
    }
  }, [data.melbourneadmin, data?.roads, drawSearch, listDisplayLayer]);

  const list: any[] = useMemo(() => {
    if (debounce.trim() == "" && !isDraw) {
      return [];
    }

    if (isDraw) {
      const admindata =
        dateSearchDraw?.melbourneadmin &&
        listDisplayLayer.includes(LAYERS.melbourneadmin)
          ? dateSearchDraw.melbourneadmin.filter((x: any) =>
              removeVietnameseTones(`${x?.properties?.NAME}`).includes(
                removeVietnameseTones(debounce.trim())
              )
            )
          : [];
      const roadsdata =
        dateSearchDraw?.roads && listDisplayLayer.includes(LAYERS.roads)
          ? dateSearchDraw.roads.filter((x: any) =>
              removeVietnameseTones(`${x?.properties?.NAME}`).includes(
                removeVietnameseTones(debounce.trim())
              )
            )
          : [];
      return [...admindata, ...roadsdata];
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
    dateSearchDraw.melbourneadmin,
    dateSearchDraw.roads,
    debounce,
    isDraw,
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
      <MapClient />
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
            {list.length > 0 ? (
              <p className={styles.msg}>Search results: {list.length}</p>
            ) : null}
            {displayList.length > 0 ? (
              <div className={styles.list} ref={ref} onScroll={handleScroll}>
                {displayList.map((v: any, i: number) => (
                  <div
                    className={clsx(styles.item, {
                      [styles.active]:
                        layerFocus?.properties?.NAME == v.properties.NAME,
                    })}
                    key={i}
                    onClick={() => {
                      dispatch(setLayerFocus(v));
                      const point = turf.centroid(v).geometry.coordinates;
                      dispatch(setCenterMap([point[1], point[0]]));
                    }}
                  >
                    <p>Name: {v.properties?.NAME}</p>
                    {v.properties?.PFI ? <p>PFI: {v.properties?.PFI}</p> : null}
                    {v.properties?.GAZ_LGA ? (
                      <p>GAZ_LGA: {v.properties?.GAZ_LGA}</p>
                    ) : null}
                    {v.properties?.RD_TYPE ? (
                      <p>RD_TYPE: {v.properties?.RD_TYPE}</p>
                    ) : null}
                    {v.properties?.RD_NUM ? (
                      <p>RD_NUM: {v.properties?.RD_NUM}</p>
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
    </div>
  );
}

export default MainHome;

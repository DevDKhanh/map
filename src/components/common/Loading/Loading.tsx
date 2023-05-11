import { Fragment, useEffect, useRef, useState } from "react";

import Portal from "../Portal";
import { PropsLoading } from "./interfaces";
import styles from "./Loading.module.scss";

function Loading({ loading }: PropsLoading) {
  //   const [num, setNum] = useState(0);

  //   useEffect(() => {
  //     if (loading) {
  //       const id = setTimeout(() => {
  //         if (num < 99) {
  //           setNum(num + 1);
  //         }
  //       }, 5);
  //       return () => clearTimeout(id);
  //     } else {
  //       setNum(0);
  //     }
  //   }, [loading, num]);

  return (
    <Fragment>
      {loading ? (
        <Portal>
          <div className={styles.container}>
            {/* <div className={styles.main}>
              <p>{num}%</p>
              <div
                className={styles.progress}
                style={{ width: `${num}%` }}
              ></div>
            </div> */}
            <div className={styles.ldsSpinner}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className={styles.text}>Đang tải dữ liệu...</p>
          </div>
        </Portal>
      ) : null}
    </Fragment>
  );
}

export default Loading;

import React, { Fragment, useEffect } from "react";

import Portal from "../Portal";
import clsx from "clsx";
import style from "./Popup.module.scss";

/*===========> INTERFACE <==========*/
interface props {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  [props: string]: any;
}

/*===========> MAIN COMPONENT <==========*/
function Overlay({ open, onClose, children }: props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [open]);

  return (
    <Fragment>
      {open && (
        <Portal>
          <div className={clsx(style.overlay, "click")} onClick={onClose}></div>
          <div className={style.main}>{children}</div>
        </Portal>
      )}
    </Fragment>
  );
}

export default Overlay;

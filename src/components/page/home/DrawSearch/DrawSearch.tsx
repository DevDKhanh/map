import { RiArrowGoBackFill, RiCloseFill } from "react-icons/ri";
import { setDrawSearch, setIsDraw } from "~/redux/reducer/user";
import { useDispatch, useSelector } from "react-redux";

import { BsTrashFill } from "react-icons/bs";
import { FaDrawPolygon } from "react-icons/fa";
import { PropsDrawSearch } from "./interfaces";
import { RootState } from "~/redux/store";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import { memo } from "react";
import styles from "./DrawSearch.module.scss";

function DrawSearch({}: PropsDrawSearch) {
  const dispatch = useDispatch();
  const { isDraw, drawSearch } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <div
        className={clsx(styles.back, {
          [styles.active]: isDraw && drawSearch.length > 0,
        })}
        onClick={() =>
          dispatch(setDrawSearch(drawSearch.slice(0, drawSearch.length - 1)))
        }
      >
        <RiArrowGoBackFill />
      </div>
      <div
        className={clsx(styles.delete, {
          [styles.active]: isDraw && drawSearch.length > 0,
        })}
        onClick={() => dispatch(setDrawSearch([]))}
      >
        <BsTrashFill />
      </div>
      <Tippy
        content={isDraw ? "Turn off drawing mode" : "Turn on drawing mode"}
      >
        <div
          className={clsx(styles.option, { [styles.active]: isDraw })}
          onClick={() => {
            dispatch(setIsDraw(!isDraw));
          }}
        >
          <FaDrawPolygon />
        </div>
      </Tippy>
    </div>
  );
}

export default memo(DrawSearch);

import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "~/components/common/Loading/Loading";
import { PropsLoadData } from "./interfaces";
import { RootState } from "~/redux/store";
import melbourneadmin from "../../../../constants/data/melbourneadmin.json";
import roads from "../../../../constants/data/roads.json";
import { setData } from "~/redux/reducer/user";
import vic_admin from "../../../../constants/data/vic_admin.json";
import vic_roads from "../../../../constants/data/vic_roads.json";

function LoadData({}: PropsLoadData) {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(
      setData({
        // melbourneadmin,
        // roads,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading loading={data == null} />;
}

export default memo(LoadData);

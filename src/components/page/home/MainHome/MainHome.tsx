import { PropsMainHome } from "./interfaces";
import dynamic from "next/dynamic";
import styles from "./MainHome.module.scss";
const MapClient = dynamic(() => import("../Map"), { ssr: false });

function MainHome({}: PropsMainHome) {
  return (
    <div>
      <MapClient />
    </div>
  );
}

export default MainHome;

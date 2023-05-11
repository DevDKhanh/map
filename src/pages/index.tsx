import Head from "next/head";
import Image from "next/image";
import LoadData from "~/components/page/home/LoadData/LoadData";
import MainHome from "~/components/page/home/MainHome/MainHome";
import { RootState } from "~/redux/store";
import styles from "~/styles/Home.module.scss";
import { useSelector } from "react-redux";

export default function Home() {
  const { data } = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.container}>
      <LoadData />
      {data !== null ? <MainHome /> : null}
    </div>
  );
}

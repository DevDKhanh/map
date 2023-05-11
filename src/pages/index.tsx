import Head from "next/head";
import Image from "next/image";
import MainHome from "~/components/page/home/MainHome/MainHome";
import styles from "~/styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <MainHome />
    </div>
  );
}

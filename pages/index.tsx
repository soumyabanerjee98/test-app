import Head from "next/head";
import styles from "./index.module.css";
import Home from "@/UI/Home";
import Image from "next/image";
import GearIcon from "../public/gear-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import Settings from "@/UI/Settings";
import { getSettingsData, settingsActions } from "@/store/action";

export default function HomePage() {
  const dispatch = useDispatch();
  const settingsOpen = useSelector(
    (state: any) => state?.settings?.settingsOpen
  );
  const openSettings = () => {
    dispatch(getSettingsData(settingsActions?.toggleSettings, true));
  };
  return (
    <>
      <Head>
        <title>Weather and Currency app</title>
        <meta
          name="description"
          content="View weather and currency of different locations"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Home />
        <Image
          src={GearIcon}
          alt="Settings"
          height={30}
          className={styles?.gear}
          onClick={openSettings}
        />
        {settingsOpen && <Settings />}
      </main>
    </>
  );
}

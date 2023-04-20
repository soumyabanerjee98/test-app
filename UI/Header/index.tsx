import Image from "next/image";
import React from "react";
import styles from "./index.module.css";
import GearIcon from "../../public/gear-solid.svg";
import { useDispatch } from "react-redux";
import { getSettingsData, settingsActions } from "@/store/action";
const Header = () => {
  const dispatch = useDispatch();
  const openSettings = () => {
    dispatch(getSettingsData(settingsActions?.toggleSettings, true));
  };
  return (
    <div className={styles?.main}>
      <div className={styles?.header}>Weather and currency app</div>
      <Image
        src={GearIcon}
        alt="Settings"
        height={30}
        className={styles?.gear}
        onClick={openSettings}
        priority
      />
    </div>
  );
};

export default Header;

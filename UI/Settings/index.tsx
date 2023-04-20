import { processIDs } from "@/config";
import {
  getLocationApiData,
  getSettingsData,
  settingsActions,
} from "@/store/action";
import { loadingAction } from "@/store/reducer/function";
import { callApi } from "@/utils";
import React from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const locations = useSelector((state: any) => state?.locationApi?.locations);
  const dispatch = useDispatch();
  const fetchSearchedLocation = async (location: string) => {
    dispatch(getLocationApiData(loadingAction, {}));
    const data = await callApi(processIDs?.searchlocation, {
      query: location,
    });
    dispatch(getLocationApiData(processIDs?.searchlocation, data?.response));
  };
  const closePopUp = () => {
    dispatch(getSettingsData(settingsActions?.toggleSettings, false));
  };
  const clickOutSide = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // @ts-ignore
    const classname: string = e.target?.className;
    if (classname?.includes("modal")) {
      closePopUp();
    }
  };
  return (
    <div className={styles?.modal} onClick={(e) => clickOutSide(e)}>
      Settings
    </div>
  );
};

export default Settings;

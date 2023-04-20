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
  const locations = useSelector((state: any) => state?.settings?.locations);
  const options = useSelector((state: any) => state?.settings?.options);
  const dispatch = useDispatch();
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
  const fetchSearchedLocation = async (location: string, currency: string) => {
    dispatch(getLocationApiData(loadingAction, {}));
    const data = await callApi(processIDs?.searchlocation, {
      query: location,
      currency: currency,
    });
    dispatch(getLocationApiData(processIDs?.searchlocation, data?.response));
  };
  const getLocationData = (location: string, currency: string) => {
    dispatch(getSettingsData(settingsActions?.activeLocation, location));
    let filteredLoc = locations?.find(
      (i: { name: string; active: boolean }) => {
        return i?.active === true;
      }
    );
    if (filteredLoc?.name !== location) {
      fetchSearchedLocation(location, currency);
    }
    closePopUp();
  };
  const toggleOptions = (opt: string) => {
    dispatch(getSettingsData(settingsActions?.toggleOptions, opt));
  };

  return (
    <div className={styles?.modal} onClick={(e) => clickOutSide(e)}>
      <div className={styles?.main}>
        <div className={styles?.list}>
          {locations?.map(
            (i: { name: string; active: boolean; currency: string }) => (
              <div
                key={`location-${i?.name}`}
                className={`${styles?.item} ${
                  i?.active ? styles?.itemactive : ""
                }`}
                onClick={() => {
                  getLocationData(i?.name, i?.currency);
                }}
              >
                {i?.name}
              </div>
            )
          )}
        </div>
        <div className={styles?.options}>
          {options?.map((i: { opt: string; active: boolean }) => (
            <div key={`option-${i?.opt}`} className={styles?.option}>
              <div className={styles?.optname}>{i?.opt}</div>
              <input
                type={"checkbox"}
                checked={i?.active}
                className={styles?.checkbox}
                onChange={() => {
                  toggleOptions(i?.opt);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;

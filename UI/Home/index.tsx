import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { callApi, formatDate, formatDateTime } from "@/utils";
import { processIDs } from "@/config";
import { getLocationApiData } from "@/store/action";

const Home = () => {
  const dispatch = useDispatch();
  const searchedLocationData = useSelector(
    (state: any) => state?.locationApi?.searchedLocationDetails
  );
  const options = useSelector((state: any) => state?.settings?.options);
  const locations = useSelector((state: any) => state?.settings?.locations);
  const selectedLocation = locations?.find(
    (i: { name: string; active: boolean; currency: string }) => {
      return i?.active === true;
    }
  );
  const loading = useSelector((state: any) => state?.locationApi?.loading);
  const fetchSearchedLocation = async () => {
    const data = await callApi(processIDs?.searchlocation, {
      query: selectedLocation?.name,
      currency: selectedLocation?.currency,
    });
    dispatch(getLocationApiData(processIDs?.searchlocation, data?.response));
  };
  return (
    <div className={styles?.main}>
      {loading ? (
        <div className={styles?.loading}>Loading...</div>
      ) : (
        <div className={styles?.page}>
          {selectedLocation ? (
            <div className={styles?.locationdata}>
              <div className={styles?.locationname}>
                Location: {selectedLocation?.name}
              </div>
              <div className={styles?.locationdetails}>
                {options?.[1]?.active ? (
                  <div className={styles?.currency}>
                    <div className={`${styles?.label} ${styles?.heading}`}>
                      {options?.[1]?.opt}:
                    </div>
                    <div className={styles?.value}>
                      {searchedLocationData?.currency?.result}{" "}
                      {selectedLocation?.currency}
                      <span className={styles?.star}>Based on 1 INR</span>
                    </div>
                  </div>
                ) : (
                  <p className={styles?.p}>
                    Please enable '{options?.[1]?.opt}' from settings
                  </p>
                )}
                {options?.[0]?.active ? (
                  <div className={styles?.weather}>
                    <div className={`${styles?.label} ${styles?.heading}`}>
                      {options?.[0]?.opt}:
                      <span
                        className={styles?.update}
                        onClick={fetchSearchedLocation}
                      >
                        Update
                      </span>
                    </div>
                    <div className={styles?.section}>
                      <span className={styles?.label}>Local date & time: </span>
                      {formatDateTime(
                        searchedLocationData?.location?.localtime
                      )}
                    </div>
                    <div className={styles?.section}>
                      <span className={styles?.label}>Region: </span>
                      {searchedLocationData?.location?.region}
                      {", "}
                      {searchedLocationData?.location?.country}
                    </div>
                    <div className={styles?.section}>
                      <span className={styles?.label}>Current condition: </span>
                      {searchedLocationData?.current?.condition?.text}
                    </div>
                    <div className={styles?.section}>
                      <span className={styles?.label}>
                        Current temperature:{" "}
                      </span>
                      {searchedLocationData?.current?.temp_c}&#8451;{" / "}
                      {searchedLocationData?.current?.temp_f}&#8457;
                    </div>
                    <div className={styles?.section}>
                      <div className={styles?.label}>Forecast: </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Condition</th>
                            <th>Temperature (max)</th>
                            <th>Temperature (min)</th>
                            <th>Chances of rain</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchedLocationData?.forecast?.forecastday?.map(
                            (i: {
                              date: string;
                              day: {
                                condition: {
                                  text: string;
                                };
                                maxtemp_c: number;
                                maxtemp_f: number;
                                mintemp_c: number;
                                mintemp_f: number;
                                daily_chance_of_rain: number;
                              };
                            }) => (
                              <tr key={`forecast-${i?.date}`}>
                                <td>{formatDate(i?.date)}</td>
                                <td>{i?.day?.condition?.text}</td>
                                <td>
                                  {i?.day?.maxtemp_c}&#8451;{" / "}
                                  {i?.day?.maxtemp_f}&#8457;
                                </td>
                                <td>
                                  {i?.day?.mintemp_c}&#8451;{" / "}
                                  {i?.day?.mintemp_f}&#8457;
                                </td>
                                <td>{i?.day?.daily_chance_of_rain}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className={styles?.p}>
                    Please enable '{options?.[0]?.opt}' from settings
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className={styles?.nolocation}>
              Please select a location to search
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLocationApiData } from "@/store/action";
import styles from "./index.module.css";
import { callApi } from "@/utils";
import { processIDs } from "@/config";

const Home = () => {
  const searchedLocationData = useSelector(
    (state: any) => state?.locationApi?.searchedLocationArray
  );
  const dispatch = useDispatch();
  const fetchSearchedLocation = async () => {
    const data = await callApi(processIDs?.searchlocation, {});
    dispatch(getLocationApiData(processIDs?.searchlocation, data?.response));
  };
  useEffect(() => {
    fetchSearchedLocation();
  }, []);
  useEffect(() => {
    console.log(searchedLocationData);
  }, [searchedLocationData]);
  return <div className={styles?.main}>Home</div>;
};

export default Home;

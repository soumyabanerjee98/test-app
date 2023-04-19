import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSearchedLocationData } from "@/store/action";
import styles from "./index.module.css";
import { callApi } from "@/utils";
import { processIDs } from "@/config";

const Home = () => {
  const searchedLocationData = useSelector(
    (state: any) => state?.searchLocation?.data
  );
  const dispatch = useDispatch();
  const fetchSearchedLocation = async () => {
    const data = await callApi(processIDs?.searchlocation, {});
    dispatch(getSearchedLocationData(data?.response));
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

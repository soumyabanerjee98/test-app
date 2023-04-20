import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";

const Home = () => {
  const searchedLocationData = useSelector(
    (state: any) => state?.locationApi?.searchedLocationDetails
  );
  const loading = useSelector((state: any) => state?.locationApi?.loading);
  return (
    <div className={styles?.main}>{loading ? <>Loading...</> : <>Home</>}</div>
  );
};

export default Home;

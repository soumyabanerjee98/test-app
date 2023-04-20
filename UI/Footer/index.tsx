import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles?.main}>
      <span className={styles?.credit}>
        Powered by{" "}
        <Link
          href="https://www.weatherapi.com/"
          title="Free Weather API"
          className={styles?.link}
          target="_blank"
        >
          WeatherAPI.com
        </Link>
        {" and "}
        <Link
          href="https://apilayer.com/"
          title="Currency API"
          className={styles?.link}
          target="_blank"
        >
          APILayer.com
        </Link>
      </span>
    </div>
  );
};

export default Footer;

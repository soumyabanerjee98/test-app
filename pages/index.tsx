import Head from "next/head";
import styles from "./index.module.css";
import Home from "@/UI/Home";
import { useSelector } from "react-redux";
import Settings from "@/UI/Settings";
import Header from "@/UI/Header";
import Footer from "@/UI/Footer";

export default function HomePage() {
  const settingsOpen = useSelector(
    (state: any) => state?.settings?.settingsOpen
  );

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
        <Header />
        <Home />
        <Footer />
        {settingsOpen && <Settings />}
      </main>
    </>
  );
}

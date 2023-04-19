import Head from "next/head";
import styles from "./index.module.css";

export default function Home() {
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
      <main className={styles.main}>App</main>
    </>
  );
}

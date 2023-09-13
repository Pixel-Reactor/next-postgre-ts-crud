import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next-Postgre-TypeScript-Tasks-App</title>
        <meta name="description" content="Next js, PostGres, TS, Task app" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-28 16:39:52
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 18:08:41
 * @FilePath: /secure-movie/src/pages/_app.tsx
 * @Description:
 */
/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-26 14:21:34
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-30 18:30:29
 * @FilePath: /secure-movie/src/pages/_app.tsx
 * @Description:
 */
import { ApolloProvider } from "@apollo/client";
import client from "services/graph";
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.scss";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../utils/contractUtil";
import { Fragment } from "react";
import { HiddenAccount } from "components/account";

function ImportVideo() {
  return (
    <>
      <Script src="/js/video.min.js"></Script>
      <Script src="/js/videojs-http-streaming.min.js"></Script>
    </>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <script type="text/javascript" src="/js/video.min.js" defer />
        <script
          type="text/javascript"
          src="/js/videojs-http-streaming.min.js"
          defer
        />
      </Head>
      <ApolloProvider client={client}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <HiddenAccount />
          <Component {...pageProps} />
        </Web3ReactProvider>
      </ApolloProvider>
    </Fragment>
  );
}

export default MyApp;

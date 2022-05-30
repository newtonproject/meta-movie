/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-26 14:21:34
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-28 18:08:16
 * @FilePath: /secure-movie/src/pages/_app.tsx
 * @Description:
 */
import { ApolloProvider } from "@apollo/client";
import client from "services/graph";
import Head from "next/head";
import "../styles/globals.scss";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../utils/contractUtil";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <script type="text/javascript" src="/js/video.min.js" />
        <script
          type="text/javascript"
          src="/js/videojs-http-streaming.min.js"
        />
      </Head>
      <ApolloProvider client={client}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      </ApolloProvider>
    </Fragment>
  );
}

export default MyApp;

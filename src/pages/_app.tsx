/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-26 14:21:34
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-27 21:47:46
 * @FilePath: /secure-movie/src/pages/_app.tsx
 * @Description:
 */
import { ApolloProvider } from "@apollo/client";
import client from "services";
import Head from "next/head";
import "../styles/globals.scss";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <link href="/css/video-js.min.css" rel="stylesheet" />
        <script type="text/javascript" src="/js/video.min.js" />
        <script
          type="text/javascript"
          src="/js/videojs-http-streaming.min.js"
        />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Fragment>
  );
}

export default MyApp;

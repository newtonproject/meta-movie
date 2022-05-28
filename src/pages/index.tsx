/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-20 15:03:11
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-28 14:58:24
 * @FilePath: /secure-movie/src/pages/index.tsx
 * @Description:
 */

import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../utils/contractUtil";
import MovieHome from "../components/movie/movieHome";

export default function Home() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className={"container"}>
        <MovieHome />
      </div>
    </Web3ReactProvider>
  );
}

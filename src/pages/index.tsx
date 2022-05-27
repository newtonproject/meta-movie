/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-20 15:03:11
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-24 16:00:29
 * @FilePath: /infinity-flower/src/pages/index.tsx
 * @Description:
 */

import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import Header from "../components/header";
import getLibrary from "../utils/contractUtil";
import MovieHome from "../components/movie/movieHome";
import MovieCreate from "../components/movie/movieCreate";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className={"container"}>
      <MovieHome />
        
      </div>
    </Web3ReactProvider>
  );
}

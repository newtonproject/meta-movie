/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-28 16:39:52
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 01:18:53
 * @FilePath: /secure-movie/src/components/movie/movieHome.tsx
 * @Description:
 */
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import MovieList from "./movieList";
import MovieMine from "./movieMine";
import Link from "next/link";
import Account from "../account";

export default function MovieHome() {
  const { library, account } = useWeb3React();
  const [tabSelected, setTabSelected] = useState(0);
 

  return (
    <div className="movie">
      <div className="content">
        <div className="wallet">
          <Account />
        </div>
        {tabSelected == 0 ? <MovieList></MovieList> : <MovieMine></MovieMine>}
      </div>
      <div className="footer">
        <div
          className="tab"
          onClick={() => {
            setTabSelected(0);
          }}
        >
          <img className="tab-icon" src="/assets/image/home.png" alt="home" />
          <span>Home</span>
        </div>
        <div className="tab">
          <Link href="/create" passHref>
            <img className="tab-center" src="/assets/image/add.png" alt="add" />
          </Link>
        </div>
        <div
          className="tab"
          onClick={() => {
            setTabSelected(1);
          }}
        >
          <img className="tab-icon" src="/assets/image/mine.png" alt="mine" />
          <span>Mine</span>
        </div>
      </div>
    </div>
  );
}

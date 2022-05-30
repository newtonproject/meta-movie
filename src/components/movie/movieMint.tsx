/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-29 15:09:46
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-30 13:37:55
 * @FilePath: /secure-movie/src/components/movie/movieMint.tsx
 * @Description:
 */
import { useWeb3React } from "@web3-react/core";
import React from "react";
import Link from "next/link";

export default function MovieMint() {
  const { library } = useWeb3React();

  return (
    <div className="mint">
      <div className="content">
        <Link href="/" passHref>
          <img className="back" src="/assets/image/back.png" alt="back" />
        </Link>
        <div className="cover-container">
          <img
            className="cover"
            src="/assets/image/cover1.png"
            alt="cover"
            onClick={() => {}}
          />
          <img
            className="preview"
            src="/assets/image/play.png"
            alt="cover"
            onClick={() => {}}
          />
        </div>
        <div className="title">The Matrix Resurrections</div>
        <div className="space"></div>
        <div className="transfer-info">
          <div className="left">From</div>
          <div className="right">NEW185...ZNek</div>
        </div>
        <div className="transfer-info">
          <div className="left">To</div>
          <div className="right">NEW185...ZNek</div>
        </div>
      </div>
      <div className="panel">
        <div className="info">
          <p className="total">Total</p>
          <div className="amount">20,000 NEW</div>
        </div>
        <Link href="result" passHref>
          <button>NEXT</button>
        </Link>
      </div>
    </div>
  );
}

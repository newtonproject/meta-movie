import { useQuery } from "@apollo/client";
import { parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { POLLING_INTERVAL } from "../../constant/connectors";
import {
  NEXT_PUBLIC_FLOWER_CONTRACT_ADDRESS,
  TARGET_CHAINID,
} from "../../constant/settings";
import useBlock from "../../hooks/useBlock";
import { useFlowerContract } from "../../hooks/useContract";
import { FlowerList, Memory, Property } from "../../model/flower";
import React, { useRef, useState } from "react";
import { NFT_FLOWER } from "../../services/queryMemory";
import {
  getBlockUrl,
  hexAddress2NewAddress,
  shortAddress,
} from "../../utils/NewChainUtils";
import Auction from "../../components/auction";
import transactor from "../../components/transactor";
import MovieList from "./movieList";
import MovieMine from "./movieMine";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Link from "next/link";

export default function MovieMint() {
  const { library } = useWeb3React();

  return (
    <div className="mint">
      <div className="content">
        <Link href="/" passHref>
        <img
            className="back"
            src="/assets/image/back.png"
            alt="back"
        />
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
        <div
          className="info"
        >
            <p className="total">Total</p>
            <div className="amount">20,000 NEW</div>
        </div>
        
        
        <button>NEXT</button>
      </div>
    </div>
  );
}

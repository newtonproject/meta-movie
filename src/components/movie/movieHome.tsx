import { useQuery } from "@apollo/client";
import { parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { POLLING_INTERVAL } from "constant/connectors";
import {
  NEXT_PUBLIC_FLOWER_CONTRACT_ADDRESS,
  TARGET_CHAINID,
} from "constant/settings";
import useBlock from "hooks/useBlock";
import { useFlowerContract } from "hooks/useContract";
import { FlowerList, Memory, Property } from "model/flower";
import React, { useRef, useState } from "react";
import { NFT_FLOWER } from "services/queryMemory";
import {
  getBlockUrl,
  hexAddress2NewAddress,
  shortAddress,
} from "utils/NewChainUtils";
import Auction from "components/auction";
import transactor from "components/transactor";
import MovieList from "./movieList";
import MovieMine from "./movieMine";

export default function MovieHome() {
  const { library } = useWeb3React();

  return (
    <div className="movie">
      <div className="content">
        <div className="wallet">
          <Auction />
        </div>
        <MovieList></MovieList>
      </div>
      <div className="footer">
        <div className="tab">
          <img
            className="tab-icon"
            src="/assets/image/water.png"
            alt="water"
            onClick={() => {}}
          />
          <span>Home</span>
        </div>
        <div className="tab">
          <img
            className="tab-center"
            src="/assets/image/new.png"
            alt="water"
            onClick={() => {}}
          />
        </div>
        <div className="tab">
          <img
            className="tab-icon"
            src="/assets/image/love.png"
            alt="water"
            onClick={() => {}}
          />
          <span>Mine</span>
        </div>
      </div>
    </div>
  );
}

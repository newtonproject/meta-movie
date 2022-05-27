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
import Link from "next/link";

export default function MovieHome() {
  const { library } = useWeb3React();
  const [tabSelected, setTabSelected] = useState(0);

  return (
    <div className="movie">
      <div className="content">
        <div className="wallet">
          <Auction />
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
          <Link href="create" passHref>
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

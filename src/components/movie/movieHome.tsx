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

export default function MovieHome() {
  const { library } = useWeb3React();

  return (
    <div className="movie">
      <div className="content">
        <div className="flower-container"></div>

        <div className="wallet">
          <Auction />
        </div>
      </div>
    </div>
  );
}

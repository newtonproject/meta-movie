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
import Link from "next/link";

export default function MovieCreate() {
  const { library } = useWeb3React();

  return (
    <div className="create">
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
          <button className="preview">Change Cover</button>
        </div>
        <div className="title">Name</div>
        <div className="input">
          <input className="normal-input" placeholder="The video's name" />
        </div>
        <div className="title">Description</div>
        <div className="input">
          <textarea
            className="multi-input"
            placeholder="The video's description"
          />
        </div>
        <div className="title">Trailor</div>
        <button className="select-trailor">+ Add Trailor</button>
        <div className="trailor">
          <img
            className="trailor-cover"
            src="/assets/image/cover1.png"
            alt="cover"
          />
          <img className="close" src="/assets/image/close.png" alt="cover" />
        </div>
        <div className="title">Blockchain</div>
        <div className="content">Newton</div>
        <div className="title">Valid time</div>
        <div className="content">24 hours</div>
        <div className="title">Price</div>
        <div className="input unit">
          <input className="normal-input" placeholder="The video's price" />
          <div className="new">NEW</div>
        </div>
        <button className="confirm">Confirm</button>
      </div>
    </div>
  );
}

/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-26 14:21:34
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-26 14:30:51
 * @FilePath: /secure-movie/src/components/movie/movieList.tsx
 * @Description:
 */
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

export default function MovieList() {
  const { library } = useWeb3React();

  const item1 = {
    address: "NEW5154...wdWM",
    time: "24 hours",
    name: "Free Guy",
    cover: "/assets/image/cover1.png",
    price: "2,000,000 NEW",
    description:
      "Here is the video Description Here is the video Description Here is the video",
  };

  const item2 = {
    address: "NEW5154...wdWM",
    time: "24 hours",
    name: "Free Guy",
    cover: "/assets/image/cover2.png",
    price: "2,000,000 NEW",
    description:
      "Here is the video Description Here is the video Description Here is the video",
  };

  const list = [
    item1,
    item2,
    item1,
    item2,
    item1,
    item2,
    item1,
    item2,
    item1,
    item2,
    item1,
    item2,
  ];

  function MovieListItem(props) {
    const { item } = props;
    return (
      <div className="list-item" key={item.name}>
        <span className="name">{item.name}</span>
        <div className="cover-container">
          <img
            className="cover"
            src={item.cover}
            alt="cover"
            onClick={() => {}}
          />
          <button className="preview">Preview</button>
        </div>
        <span className="price">{item.price}</span>
        <span className="description">{item.description}</span>
        <div className="panel">
          <Link href="mint" passHref>
            <button>Mint</button>
          </Link>

          <div className="panel-info">
            <span className="bold">10 times</span>
            <span className="normal">Remaining Mints</span>
          </div>
        </div>
        <span className="time">Valid time after purchase: {item.time}</span>
        <div className="user">
          <img className="user-icon" src="/assets/image/user.png" alt="user" />
          <span className="address">{item.address}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-container">
      {list.map((item, indexed) => {
        return <MovieListItem key={indexed} item={item} />;
      })}
    </div>
  );
}

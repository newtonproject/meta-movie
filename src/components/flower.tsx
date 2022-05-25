/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-20 15:49:24
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-24 18:18:47
 * @FilePath: /infinity-flower/src/components/flower.tsx
 * @Description:
 */
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
import Auction from "./auction";
import transactor from "./transactor";

export default function Flower() {
  const mCanvas = useRef<HTMLCanvasElement>(null);
  const [flowerInfo, setFlowerInfo] = useState<FlowerList>(null);
  const { library } = useWeb3React();
  const [name, setName] = useState("");
  const [mintBlock, setMintBlock] = useState("");
  const [memories, setMemories] = useState<Array<Memory>>();
  const [memoryInfos, setMemoryInfos] = useState<Array<string>>();
  const [properties, setProperties] = useState<Array<Property>>();
  const [tokenId, setTokenId] = useState("");
  const [totalHeight, setTotalHeight] = useState(0);
  const flowerContract = useFlowerContract();
  const blockNumber = useBlock(library);

  const WATER = 1;
  const LIGHT = 2;
  const LOVE = 3;

  const WATER_HEIGHT = 1;
  const LIGHT_HEIGHT = 2;
  const LOVE_HEIGHT = 3;

  const LIGHT_PROPERTY =
    "0x7c4aa055bcee97a7b3132a2bf5ef2ca1f219564388c1b6228c7064ace9c00a28";
  const LOVE_PROPERTY =
    "0xd952fe0740d9d14011fc8ead3ab7de3c739d3aa93ce9254c10b0134d80d26a30";
  const WATER_PROPERTY =
    "0x7464bd924e765ce487910dde7cf78faee47c96a6328f88a0cd374cd7c2491abd";
  const HEIGHT_PROPERTY =
    "0x048dd4d5794e69cea63353d940276ad61f89c65942226a2bb5bd352536892f82";

  const filterId = NEXT_PUBLIC_FLOWER_CONTRACT_ADDRESS.toLowerCase() + "-0";
  const where = {
    id: filterId,
  };
  const { loading, data, fetchMore, error } = useQuery<FlowerList>(NFT_FLOWER, {
    variables: {
      where: where,
    },
    fetchPolicy: "cache-and-network",
    pollInterval: POLLING_INTERVAL,
    onCompleted: (data) => {
      console.log(data);

      setFlowerInfo(data);
      setName(data.flowers[0].contract.name);
      setMintBlock(data.flowers[0].mintBlock);
      setMemories(data.flowers[0].memories);
      setProperties(data.flowers[0].properties);
      setTokenId(data.flowers[0].tokenId);
      parseMemoryAndDraw(data.flowers[0].memories);
      setMemoryInfos(parseMemoryInformation(data.flowers[0].memories));
    },
  });

  if (!flowerInfo || loading) {
    return <>loading...</>;
  }
  if (error) {
    return <>:error</>;
  }

  function parseMemoryAndDraw(memories: Array<Memory>) {
    let number = 0;
    for (let i = 0; i < memories.length; i++) {
      if (memories[i].propertyId == WATER_PROPERTY) {
        number += WATER_HEIGHT;
      } else if (memories[i].propertyId == LOVE_PROPERTY) {
        number += LOVE_HEIGHT;
      } else if (memories[i].propertyId == LIGHT_PROPERTY) {
        number += LIGHT_HEIGHT;
      }
    }

    console.log(`number: ${number}`);
    setTotalHeight(number);
    draw(number);
  }

  function draw(number: number) {
    const num = number;
    const ctx = mCanvas.current?.getContext("2d");
    if (!ctx) {
      console.log("no canvas current 2d");
      return;
    }
    // root height
    const bottomHeight = 150;
    // flower height
    const topHeight = 200;
    // per mid height
    const perMidHeight = 25;
    const bottomRootHeight = 180;
    const padding = 100;
    const topRootHeight = 25;

    const yOffset = 120;
    const yMidOffset = 165;
    const yTopOffset = 135;
    const yFlowerOffset = -80;
    mCanvas.current.width = 375;

    const totalHeight =
      bottomHeight +
      bottomRootHeight +
      topHeight +
      perMidHeight * num +
      padding;
    const minHeight = 800;

    const currentHeight = Math.max(totalHeight, minHeight);
    mCanvas.current.height = currentHeight;

    const bottomRoot = new Image();
    bottomRoot.src = "/assets/image/bottom_root1.png";
    bottomRoot.addEventListener("load", () => {
      ctx.drawImage(
        bottomRoot,
        yOffset,
        currentHeight - bottomHeight - bottomRootHeight
      );
      ctx.save();

      const bottom = new Image();
      bottom.src = "/assets/image/flower_bottom.png";
      bottom.addEventListener("load", () => {
        ctx.drawImage(bottom, 0, currentHeight - bottomHeight);
        ctx.save();
      });
    });

    const midImage = new Image();
    midImage.src = "/assets/image/mid_root1.png";
    midImage.addEventListener("load", () => {
      for (let i = 0; i < num; i++) {
        ctx.drawImage(
          midImage,
          yMidOffset,
          currentHeight - bottomHeight - bottomRootHeight - i * perMidHeight
        );
      }
      ctx.save();
    });

    const firstRoot = new Image();
    firstRoot.src = "/assets/image/top_root1.png";
    firstRoot.addEventListener("load", () => {
      ctx.drawImage(
        firstRoot,
        yTopOffset,
        currentHeight -
          bottomHeight -
          bottomRootHeight -
          topRootHeight -
          (num - 1) * perMidHeight
      );
      ctx.save();
    });

    const flower = new Image();
    flower.src = "/assets/image/flower1.png";
    flower.addEventListener("load", () => {
      ctx.drawImage(
        flower,
        yFlowerOffset,
        currentHeight -
          bottomHeight -
          bottomRootHeight -
          topRootHeight -
          topHeight -
          (num - 1) * perMidHeight
      );
      ctx.save();
    });

    const splash = new Image();
    splash.src = "/assets/image/splash.png";
    splash.addEventListener("load", () => {
      ctx.drawImage(
        splash,
        yFlowerOffset,
        currentHeight -
          bottomHeight -
          bottomRootHeight -
          topRootHeight -
          topHeight -
          (num - 1) * perMidHeight
      );
      ctx.save();
    });
  }

  function action(type: number) {
    let propertyId = "";
    var overrides = {
      value: parseEther("0"),
    };
    if (type == LIGHT) {
      propertyId = LIGHT_PROPERTY;
      overrides.value = parseEther("20");
    } else if (type == LOVE) {
      propertyId = LOVE_PROPERTY;
      overrides.value = parseEther("100");
    } else if (type == WATER) {
      propertyId = WATER_PROPERTY;
      overrides.value = parseEther("10");
    }
    transactor(
      flowerContract.setDynamicProperty(tokenId, propertyId, 1, overrides),
      () => {
        console.log();
      }
    );
  }

  return (
    <div className="flower">
      <div className="content">
        <div className="flower-container">
          <canvas ref={mCanvas}></canvas>
        </div>

        <div className="action-container">
          <img
            src="/assets/image/love.png"
            alt="love"
            onClick={() => {
              action(LOVE);
            }}
          />
          <img
            src="/assets/image/sun.png"
            alt="light"
            onClick={() => {
              action(LIGHT);
            }}
          />
          <img
            src="/assets/image/water.png"
            alt="water"
            onClick={() => {
              action(WATER);
            }}
          />
        </div>

        <div className="properties">
          <div className="memory">
            <div className="title">Memory:</div>

            <div className="item">
              {memoryInfos &&
                memoryInfos.map((memory, index) => {
                  return (
                    <div key={index}>
                      <p>{memory}</p>
                    </div>
                  );
                })}
            </div>

            <div className="info">
              <p>Flower Height: {totalHeight}</p>
              {blockNumber && blockNumber > 0 ? (
                <p>Age: #{blockNumber - parseInt(mintBlock)}</p>
              ) : (
                <></>
              )}
              <p>
                Birthday:{" "}
                <a href={getBlockUrl(mintBlock)} target="_blank">
                  #{mintBlock}
                </a>
              </p>
              <p>EVT Name: {name}</p>
              <p>
                Blockchain: <a href="https://www.newtonproject.org">Newton</a>
              </p>
            </div>
          </div>
        </div>

        <div className="wallet">
          <Auction />
        </div>
      </div>
    </div>
  );

  function getAction(propertyId: string) {
    let info = {
      action: "",
      height: 0,
    };
    switch (propertyId) {
      case WATER_PROPERTY:
        info.action = "💧";
        info.height = WATER_HEIGHT;
        break;
      case LIGHT_PROPERTY:
        info.action = "🌞";
        info.height = LIGHT_HEIGHT;
        break;
      case LOVE_PROPERTY:
        info.action = "❤️";
        info.height = LOVE_HEIGHT;
        break;
      default:
        break;
    }
    return info;
  }

  function parseMemoryInformation(memories: Array<Memory>): Array<string> {
    let res = [];
    memories.forEach((memory) => {
      const info = getMemoryInfo(memory);
      if (info) {
        res.push(info);
      }
    });
    return res;
  }

  function getMemoryInfo(memory: Memory): string {
    let temp = null;
    if (memory.propertyId == HEIGHT_PROPERTY) {
      return temp;
    }
    const actionOwner = shortAddress(
      hexAddress2NewAddress(memory.account.id, TARGET_CHAINID)
    );
    const info = getAction(memory.propertyId);
    return `📢: ${actionOwner} add ${info.action} on block #${memory.block}, flower height + ${info.height}`;
  }
}

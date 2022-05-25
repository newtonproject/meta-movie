import { useQuery } from "@apollo/client";
import { parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
// import { POLLING_INTERVAL } from "constant/connectors";
import useBlock from "hooks/useBlock";
import { useFlowerContract } from "hooks/useContract";
import React, { useRef, useState } from "react";
import {
  getBlockUrl,
  hexAddress2NewAddress,
  shortAddress,
} from "utils/NewChainUtils";
import transactor from "components/transactor";

export default function MovieMine() {
  const { library } = useWeb3React();

  return <div className="bg-red-200"></div>;
}

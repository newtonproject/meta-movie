import { useWeb3React } from "@web3-react/core";
import { POLLING_INTERVAL } from "../../constant/connectors";
import React, { useRef, useState } from "react";
import Link from "next/link";

export default function MintSuccess() {
  const { library } = useWeb3React();

  return (
    <div className="result">
      <div className="content">
        <img
          className="success"
          src="/assets/image/success.png"
          alt="success"
        />
        <div className="title">Mint Successful</div>
        <Link href="detail" passHref>
          <button>Check EVT</button>
        </Link>
      </div>
    </div>
  );
}

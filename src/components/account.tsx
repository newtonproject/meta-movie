/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-17 14:41:12
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-20 14:35:13
 * @FilePath: /cryptofamily-website/src/components/account.tsx
 * @Description:
 */
import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { injected } from "constant/connectors";
import useBalance from "hooks/useBalance";
import { useEagerConnect, useInactiveListener } from "hooks/useWeb3";
import React, { useEffect, useState } from "react";

export default function Account() {
  const context = useWeb3React();

  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  const [activatingConnector, setActivatingConnector] = useState();

  const balance = useBalance(library, account);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <div className="rounded border border-gray-400">
      {active ? (
        // show wallet information
        <>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <p>{chainId}</p>
              <p>{account}</p>
              <button onClick={() => deactivate()}>disconnect</button>
            </div>
            <div>{formatEther(balance === undefined ? "0" : balance)} NEW</div>
          </div>
        </>
      ) : (
        // show connected wallet
        <>
          <button
            onClick={() => {
              activate(injected);
            }}
          >
            connected
          </button>
        </>
      )}
    </div>
  );
}

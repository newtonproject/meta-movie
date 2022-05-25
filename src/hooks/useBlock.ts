/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-20 14:33:18
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-24 15:40:12
 * @FilePath: /infinity-flower/src/hooks/useBlock.ts
 * @Description:
 */
import { useState } from "react";
import usePoller from "./usePooler";
import { formatEther } from "@ethersproject/units";
import { POLLING_INTERVAL } from "constant/connectors";

/*
  ~ What it does? ~

  Gets your balance in ETH from given address and provider

  ~ How can I use? ~

  const yourLocalBalance = useBalance(localProvider, address);

  ~ Features ~

  - Provide address and get balance corresponding to given address
  - Change provider to access balance on different chains (ex. mainnetProvider)
*/

export default function useBlock(library) {
  const [balance, setBalance] = useState(0);

  const pollBlock = async () => {
    let request = {
      jsonrpc: "2.0",
      id: 2,
      method: "eth_blockNumber",
      params: [],
    };
    if (library === undefined) {
      setBalance(0);
    } else {
      library.provider.sendAsync(request, (error, response) => {
        if (response) {
          setBalance(parseInt(response.result));
        } else {
          console.log("get balance error:" + error);
        }
      });
    }
  };
  usePoller(pollBlock, POLLING_INTERVAL, false);
  return balance;
}

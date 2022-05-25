/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-18 11:50:55
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-24 09:57:58
 * @FilePath: /infinity-flower/src/hooks/useContract.ts
 * @Description:
 */
import {
  NEXT_AUCTION_CONTRACT_ADDRESS,
  NEXT_PUBLIC_FLOWER_CONTRACT_ADDRESS,
} from "constant/settings";
import { useActiveWeb3React } from "hooks/useWeb3";
import { getContract } from "utils/contractUtil";
import { useMemo } from "react";
import AuctionABI from "../abi/AuctionHouse.json";
import FlowerABI from "../abi/Flower.json";

function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useAuction() {
  return useContract(NEXT_AUCTION_CONTRACT_ADDRESS, AuctionABI);
}

export function useFlowerContract() {
  return useContract(NEXT_PUBLIC_FLOWER_CONTRACT_ADDRESS, FlowerABI);
}

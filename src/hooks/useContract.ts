/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-18 11:50:55
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 00:03:34
 * @FilePath: /secure-movie/src/hooks/useContract.ts
 * @Description:
 */
import {
  NEXT_AUCTION_CONTRACT_ADDRESS,
  NEXT_PUBLIC_FLOWER_CONTRACT_ADDRESS,
  NEXT_PUBLIC_MOVIE_CONTRACT,
} from "constant/settings";
import { useActiveWeb3React } from "hooks/useWeb3";
import { getContract } from "utils/contractUtil";
import { useMemo } from "react";
import SecureMovieABI from "../abi/SecureMovie.json";

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

export function useSecureMovieContract() {
  return useContract(NEXT_PUBLIC_MOVIE_CONTRACT, SecureMovieABI);
}

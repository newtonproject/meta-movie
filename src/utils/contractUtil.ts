/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-18 11:52:06
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-18 11:59:21
 * @FilePath: /cryptofamily-website/src/pages/utils/contractUtil.ts
 * @Description:
 */
import { isAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { POLLING_INTERVAL } from "constant/connectors";

export default function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

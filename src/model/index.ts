/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-20 11:34:08
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-20 11:35:49
 * @FilePath: /cryptofamily-website/src/model/index.ts
 * @Description:
 */
export interface NFTTokenList {
  nfts: Array<NFTToken>;
}

export class NFTToken {
  id: string;
  tokenId: string;
  uri: string;
  auctionId: string;
  auctionContract: string;
  auction: Auction;
}

export class Auction {
  id: string;
  amount: string;
  timeBuffer: string;
  minBidIncrementPercentage: string;
  auctionId: string;
  settled: boolean;
  bidder: Bidder;
  bids: Array<Bid>;
}

export class Bidder {
  id: string;
}

export class Bid {
  id: string;
  amount: string;
  time: string;
}

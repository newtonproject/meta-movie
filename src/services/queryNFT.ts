import { gql } from "@apollo/client";

export const NFT_TOKEN_LIST = gql(`
  query GetNFTToken($skip: Int) {
    nfts(skip: $skip) {
      id
      tokenId
      uri
      auctionId
      auctionContract
      auction {
        id
        amount
        timeBuffer
        minBidIncrementPercentage
        auctionId
        settled
        bidder {
          id
        }
        bids {
          id
          amount
          time
        }
      }
    }
  }
`);

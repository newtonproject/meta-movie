/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-23 14:47:44
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-24 18:18:22
 * @FilePath: /infinity-flower/src/services/queryMemory.ts
 * @Description:
 */
import { gql } from "@apollo/client";

export const NFT_FLOWER = gql(`
  query GetFlower($skip: Int, $where: Flower_filter) {
    flowers(skip: $skip, where: $where) {
      id
      contract {
        id
        name
        symbol
      }
      tokenId
      minter
      mintTx
      mintTime
      mintBlock
      owner {
        id
      }
      properties {
        id
        propertyId
        propertyValue
        amount
      }
      memories(orderBy: time, orderDirection: desc) {
        id
        propertyId
        propertyValue
        valueIncrease
        amount
        time
        block
        account {
          id
        }
      }
    }
  }
`);

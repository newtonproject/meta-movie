/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-30 23:37:32
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 00:34:38
 * @FilePath: /secure-movie/src/services/graph/querySMTokens.ts
 * @Description:
 */
import { gql } from "@apollo/client";

export const GET_SECURE_MOVIE_TOKENS = gql(`
   query getSecureMovieTokens($skip: Int, $first: Int, $orderDirection: String, $orderBy: String) {
    secureMovieTokens(skip: $skip, first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      movieTokenId
      owner {
        id
      }
      mintTime
      movieContract {
        id
        name
        symbol
      }
      movieTokenUri
      tickets {
        id
        name
        symbol
        price
        max
        duration
      }
    }
   }
 `);

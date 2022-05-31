/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-30 23:37:32
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-30 23:51:43
 * @FilePath: /secure-movie/src/services/graph/querySMTicketTokens.ts
 * @Description:
 */
import { gql } from "@apollo/client";

export const GET_SECURE_MOVIE_TICKET_TOKENS = gql(`
   query getSecureMovieTicketTokens($skip: Int, $first: Int, $orderBy: String, $orderDirection: String, $where: SecureMovieTicketToken_filter) {
    secureMovieTicketTokens(skip: $skip, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, where: $where){
      id
      startTime
      endTime
      owner {
        id
      }
      movieToken {
        id
        movieContract {
          id
          name
          symbol
        }
        movieTokenUri
      }
    }
   }
 `);

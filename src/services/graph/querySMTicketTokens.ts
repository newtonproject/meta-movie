import { gql } from "@apollo/client";
import { secureMovieTicketTokenInfo } from "entities/SMEntity";
import client from ".";

export const GET_SECURE_MOVIE_TICKET_TOKENS = gql(`
   query getSecureMovieTicketTokens($skip: Int, $first: Int) {
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
 `);

export function getSecureMovieTicketTokens() {
  return client.query<secureMovieTicketTokenInfo>({
    query: GET_SECURE_MOVIE_TICKET_TOKENS,
    variables: {
      skip: 0,
      first: 50,
    },
  });
}

// export function getLatestEstate() {
//     return andverseClient.query<EstateList>({
//       query: GET_LATEST_ESTATE,
//       variables: {
//         skip: 0,
//         first: 5,
//         orderBy: 'mintTime',
//         orderDirection: OrderDirection.DESC
//       }
//     })
//   }

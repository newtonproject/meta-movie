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
        movieTokenId
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

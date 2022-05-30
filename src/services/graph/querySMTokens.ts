import { gql } from "@apollo/client";
import { secureMovieTokenInfo } from "entities/SMEntity";
import client from ".";

export const GET_SECURE_MOVIE_TOKENS = gql(`
   query getSecureMovieTokens($skip: Int, $first: Int) {
    id
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
 `);

export function getSecureMovieTicketTokens() {
  return client.query<secureMovieTokenInfo>({
    query: GET_SECURE_MOVIE_TOKENS,
    variables: {
      skip: 0,
      first: 50,
    },
  });
}

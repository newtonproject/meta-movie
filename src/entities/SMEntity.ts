/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-30 23:37:32
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 20:11:47
 * @FilePath: /secure-movie/src/entities/SMEntity.ts
 * @Description:
 */
export class MovieContract {
  id: string;
  name: string;
  symbol: string;
}

export class Tickets {
  id: string;
  name: string;
  symbol: string;
  price: string;
  max: string;
  duration: string;
  totalSupply: string;
}

export class Owner {
  id: string;
}

export class MovieToken {
  id: string;
  movieTokenId: string;
  movieContract: MovieContract;
  movieTokenUri: string;
}

export class SMToken {
  id: string;
  movieTokenId: string;
  mintTime: string;
  movieContract: MovieContract;
  movieTokenUri: string;
  tickets: Tickets;
  owner: Owner;
  ticketTokens: Array<SMTicketToken>;
}

export class SMTicketToken {
  id: string;
  startTime: string;
  endTime: string;
  owner: Owner;
  movieToken: MovieToken;
}

export class SecureMovieInfo {
  secureMovieTokens: Array<SMToken>;
}

export class SecureMovieTicketTokensInfo {
  secureMovieTicketTokens: Array<SMTicketToken>;
}

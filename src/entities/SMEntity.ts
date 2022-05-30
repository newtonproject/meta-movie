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
}

export class Owner {
  id: string;
}

export class MovieToken {
  id: string;
  movieContract: MovieContract;
  movieTokenUri: string;
}

export class SMToken {
  id: string;
  movieContract: MovieContract;
  movieTokenUri: string;
  tickets: Tickets;
}

export class SMTicketToken {
  id: string;
  startTime: string;
  endTime: string;
  owner: Owner;
  movieToken: MovieToken;
}

export class secureMovieInfo {
  secureMovieTicketTokens: Array<SMTicketToken>;
  secureMovieTokens: Array<SMToken>;
}

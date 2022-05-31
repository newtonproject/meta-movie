/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-26 14:21:34
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 19:43:42
 * @FilePath: /secure-movie/src/components/movie/movieList.tsx
 * @Description:
 */
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GET_SECURE_MOVIE_TOKENS } from "../../services/graph/querySMTokens";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { SecureMovieInfo, SMToken } from "entities/SMEntity";
import { pageSize, POLLING_INTERVAL } from "constant";
import { useTokenDescription } from "hooks/useTokenDescription";
import { formatEther, parseEther } from "@ethersproject/units";
import { hexAddress2NewAddress } from "utils/NewChainUtils";
import { TARGET_CHAINID } from "constant/settings";
import { useSecureMovieContract } from "hooks/useContract";
import transactor from "components/transactor";
import useBalance from "hooks/useBalance";

export default function MovieList() {
  const { library, account } = useWeb3React();
  const router = useRouter();
  const secureMovieContract = useSecureMovieContract();
  const balance = useBalance(library, account);

  const [secureMovieInfos, setSecureMovieInfos] = useState<Array<SMToken>>();

  const { loading, error, data, fetchMore } = useQuery<SecureMovieInfo>(
    GET_SECURE_MOVIE_TOKENS,
    {
      variables: {
        skip: 0,
        first: pageSize,
        orderBy: "mintTime",
        orderDirection: "desc",
        where: {},
        ticket_where: { owner: account.toLowerCase() },
      },
      fetchPolicy: "cache-and-network",
      pollInterval: POLLING_INTERVAL,
      onCompleted: (data) => {
        console.log(data);
        setSecureMovieInfos(data.secureMovieTokens);
      },
    }
  );

  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error :(</>;
  }

  function openMovieDetail(detailProps) {
    router.push({
      pathname: "/detail",
      query: detailProps,
    });
  }

  function MovieListItem(props) {
    const { item } = props;

    const movieToken = item as SMToken;
    const tokenMetaData = useTokenDescription(item.movieTokenUri);
    const ticket = movieToken.tickets[0];
    const price = formatEther(ticket.price);
    const maxTicketNumber = ticket.max;
    const purchaseTime = ticket.duration / 3600;
    const ticketAddress = ticket.id;
    const owner = hexAddress2NewAddress(movieToken.owner.id, TARGET_CHAINID);
    const isOwner = movieToken.owner.id === account.toLowerCase();
    const hasTicket = movieToken.ticketTokens.length > 0;
    const canView = isOwner || hasTicket;

    const detailProps = {
      name: tokenMetaData.tokenName,
      description: tokenMetaData.tokenDescription,
      contractAddress: hexAddress2NewAddress(
        movieToken.movieContract.id,
        TARGET_CHAINID
      ),
      tokenId: movieToken.movieTokenId,
      tokenStandard: "EVT",
      failureTime: "2020 12 31",
      videoUrl: tokenMetaData.tokenVideo,
      coverImage: tokenMetaData.tokenImage,
    };

    // todo: has permission for buy ? view? owner?
    function buyTickets() {
      const movieId = movieToken.movieTokenId;
      console.log(parseEther(price));

      const overrides = {
        value: parseEther(price)._hex,
      };
      const transaction = secureMovieContract.buyTicket(
        movieId,
        ticketAddress,
        1,
        overrides
      );
      transactor(transaction, () => {});
    }

    return (
      <div className="list-item" key={item.name}>
        <span className="name">{item.name}</span>
        <div className="cover-container">
          <img
            className="cover"
            src={tokenMetaData.tokenImage}
            alt="cover"
            onClick={() => {
              // openMovieDetail(detailProps);
            }}
          />
          {/* <button className="preview">Trailer</button> */}
        </div>
        <span className="price">{price} NEW</span>
        <span className="description">{tokenMetaData.tokenDescription}</span>
        <div className="panel">
          {/* <Link href="/mint" passHref> */}
          {canView ? (
            <>
              <button
                onClick={() => {
                  openMovieDetail(detailProps);
                }}
              >
                View
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                buyTickets();
              }}
            >
              Buy
            </button>
          )}

          {/* </Link> */}
          <div className="panel-info">
            <span className="bold">{maxTicketNumber} times</span>
            <span className="normal">Remaining Mints</span>
          </div>
        </div>
        <span className="time">
          Valid time after purchase: {purchaseTime} hour
        </span>
        <div className="user">
          <img className="user-icon" src="/assets/image/user.png" alt="" />
          <span className="address">{owner}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-container">
      {secureMovieInfos &&
        secureMovieInfos.map((item, indexed) => {
          return <MovieListItem key={indexed} item={item} />;
        })}
    </div>
  );
}

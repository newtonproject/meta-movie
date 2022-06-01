/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-26 14:21:34
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 19:51:20
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
import HashLoader from "react-spinners/HashLoader";
import Loading from "../Loading";

export default function MovieList() {
  const { library, account } = useWeb3React();
  const router = useRouter();
  const secureMovieContract = useSecureMovieContract();

  const balance = useBalance(library, account);

  const [secureMovieInfos, setSecureMovieInfos] = useState<Array<SMToken>>();

  let ticketWhere = {};
  if (account) {
    ticketWhere = { owner: account.toLowerCase() };
  }

  const { loading, error, data, fetchMore } = useQuery<SecureMovieInfo>(
    GET_SECURE_MOVIE_TOKENS,
    {
      variables: {
        skip: 0,
        first: pageSize,
        orderBy: "mintTime",
        orderDirection: "desc",
        where: {},
        ticket_where: ticketWhere,
      },
      fetchPolicy: "cache-and-network",
      pollInterval: POLLING_INTERVAL,
      onCompleted: (data) => {
        setSecureMovieInfos(data.secureMovieTokens);
      },
    }
  );

  // if (loading) {
  //   return <>Loading...</>;
  // }
  // if (error) {
  //   return <>Error :(</>;
  // }

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
    const maxTicketNumber = parseInt(ticket.max) - parseInt(ticket.totalSupply);
    const purchaseTime = ticket.duration / 3600;
    const ticketAddress = ticket.id;
    const owner = hexAddress2NewAddress(movieToken.owner.id, TARGET_CHAINID);
    const isOwner = account
      ? movieToken.owner.id === account.toLowerCase()
      : false;
    const hasTicket = movieToken.ticketTokens.length > 0;
    const canView = isOwner || hasTicket;
    console.log(movieToken.ticketTokens);

    const detailProps = {
      name: tokenMetaData.tokenName,
      description: tokenMetaData.tokenDescription,
      contractAddress: hexAddress2NewAddress(
        movieToken.movieContract.id,
        TARGET_CHAINID
      ),
      tokenId: movieToken.movieTokenId,
      tokenStandard: "EVT",
      failureTime: "-",
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
        <span className="name">{tokenMetaData.tokenName}</span>
        <div className="cover-container">
          <img
            className="cover"
            src={
              tokenMetaData.tokenImage === ""
                ? "/assets/image/video_placeholder.png"
                : tokenMetaData.tokenImage
            }
            alt=""
            onClick={() => {
              // openMovieDetail(detailProps);
            }}
          />
          {/* <button className="preview">Trailer</button> */}
        </div>
        <span className="price">{price} NEW</span>
        <div className="desc">
          <span className="description">{tokenMetaData.tokenDescription}</span>
          <img
            className="next"
            src="/assets/image/details.png"
            alt=""
            onClick={() => {
              openMovieDetail(detailProps);
            }}
          />
        </div>

        <div className="panel" hidden={maxTicketNumber <= 0}>
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
    <>
      <div className="movie-container">
        {/* {
        loading && <HashLoader color={"#fff000"} loading={true} css={override} size={50} />
      } */}

        {secureMovieInfos &&
          secureMovieInfos.map((item, indexed) => {
            return <MovieListItem key={indexed} item={item} />;
          })}
      </div>
      <Loading loading={loading} />
    </>
  );
}

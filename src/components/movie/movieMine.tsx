import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import { pageSize, POLLING_INTERVAL } from "constant";
import {
  SecureMovieInfo,
  SMTicketToken,
  SMToken,
  SecureMovieTicketTokensInfo,
} from "entities/SMEntity";
import React, { useState } from "react";
import { GET_SECURE_MOVIE_TOKENS } from "services/graph/querySMTokens";
import { GET_SECURE_MOVIE_TICKET_TOKENS } from "services/graph/querySMTicketTokens";
import { useTokenDescription } from "hooks/useTokenDescription";
import { formatEther, parseEther } from "@ethersproject/units";
import { hexAddress2NewAddress } from "utils/NewChainUtils";
import { TARGET_CHAINID } from "constant/settings";
import { useRouter } from "next/router";
import Loading from "components/Loading";

export default function MovieMine() {
  const { library, account } = useWeb3React();
  const [tabSelected, setTabSelected] = useState(0);

  function MyMovie() {
    const [secureMovieInfos, setSecureMovieInfos] = useState<Array<SMToken>>();

    const { loading, error, data, fetchMore } = useQuery<SecureMovieInfo>(
      GET_SECURE_MOVIE_TOKENS,
      {
        variables: {
          skip: 0,
          first: pageSize,
          orderBy: "mintTime",
          orderDirection: "desc",
          where: { owner: account.toLowerCase() },
        },
        fetchPolicy: "cache-and-network",
        pollInterval: POLLING_INTERVAL,
        onCompleted: (data) => {
          console.log(data);
          setSecureMovieInfos(data.secureMovieTokens);
        },
      }
    );
    return (
      <>
        {secureMovieInfos &&
          secureMovieInfos.map((item, indexed) => {
            return <MovieListItem key={indexed} item={item} />;
          })}
        <Loading loading={loading} />
        <img
          className="empty"
          src="/assets/image/empty.png"
          alt=""
          hidden={secureMovieInfos && secureMovieInfos.length > 0}
        />
      </>
    );
  }

  function MyTickets() {
    const [secureMovieTicketInfos, setSecureMovieTicketInfos] =
      useState<Array<SMTicketToken>>();

    const { loading, error, data, fetchMore } =
      useQuery<SecureMovieTicketTokensInfo>(GET_SECURE_MOVIE_TICKET_TOKENS, {
        variables: {
          skip: 0,
          first: pageSize,
          orderBy: "mintTime",
          orderDirection: "desc",
          where: { owner: account.toLowerCase() },
        },
        fetchPolicy: "cache-and-network",
        pollInterval: POLLING_INTERVAL,
        onCompleted: (data) => {
          console.log(data);
          setSecureMovieTicketInfos(data.secureMovieTicketTokens);
        },
      });
    return (
      <>
        {secureMovieTicketInfos &&
          secureMovieTicketInfos.map((item, indexed) => {
            return <TicketItem key={indexed} item={item} />;
          })}
        <Loading loading={loading} />
        <img
          className="empty"
          src="/assets/image/empty.png"
          alt=""
          hidden={secureMovieTicketInfos && secureMovieTicketInfos.length > 0}
        />
      </>
    );
  }

  function MovieListItem(props) {
    const { item } = props;
    const router = useRouter();
    const movieToken = item as SMToken;
    const tokenMetaData = useTokenDescription(item.movieTokenUri);
    const ticket = movieToken.tickets[0];
    const price = formatEther(ticket.price);
    const maxTicketNumber = ticket.max;
    const purchaseTime = ticket.duration / 3600;
    const ticketAddress = ticket.id;
    const owner = hexAddress2NewAddress(movieToken.owner.id, TARGET_CHAINID);

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

    function openMovieDetail() {
      router.push({
        pathname: "/detail",
        query: detailProps,
      });
    }

    return (
      <div
        className="my-item-container"
        onClick={() => {
          openMovieDetail();
        }}
      >
        <div className="cover-container">
          <img
            className="cover"
            src={tokenMetaData.tokenImage}
            alt=""
            onClick={() => {}}
          />
        </div>
        <div className="info">
          <span className="name">{tokenMetaData.tokenName}</span>
          <span className="token">Token id: {item.movieTokenId}</span>
        </div>
      </div>
    );
  }

  function TicketItem(props) {
    const { item } = props;
    const router = useRouter();
    const ticketToken = item as SMTicketToken;
    const tokenMetaData = useTokenDescription(
      ticketToken.movieToken.movieTokenUri
    );

    const detailProps = {
      name: tokenMetaData.tokenName,
      description: tokenMetaData.tokenDescription,
      contractAddress: hexAddress2NewAddress(
        ticketToken.movieToken.movieContract.id,
        TARGET_CHAINID
      ),
      tokenId: ticketToken.movieToken.movieTokenId,
      tokenStandard: "EVT",
      failureTime: "2020 12 31",
      videoUrl: tokenMetaData.tokenVideo,
      coverImage: tokenMetaData.tokenImage,
    };

    function openMovieDetail() {
      router.push({
        pathname: "/detail",
        query: detailProps,
      });
    }

    return (
      <div
        className="ticket-container"
        key={item.toString()}
        onClick={() => {
          openMovieDetail();
        }}
      >
        <div className="info">
          <span className="name">{tokenMetaData.tokenName}</span>
          <div className="token">Token id: {item.id}</div>
          <span className="token">Expiration time: {item.endTime}</span>
        </div>
        <div className="cover-container">
          <img
            className="cover"
            src={tokenMetaData.tokenImage}
            alt="cover"
            onClick={() => {}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mine-container">
      <div className="line" />
      <div className="selector">
        <button
          className={
            tabSelected == 0 ? "selector-item select" : "selector-item unselect"
          }
          onClick={() => {
            setTabSelected(0);
          }}
        >
          My Creation
        </button>
        <button
          className={
            tabSelected == 1 ? "selector-item select" : "selector-item unselect"
          }
          onClick={() => {
            setTabSelected(1);
          }}
        >
          My Movie Ticket
        </button>
      </div>
      <div className="item-container">
        {tabSelected == 0 ? (
          <MyMovie />
        ) : tabSelected == 1 ? (
          <MyTickets />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

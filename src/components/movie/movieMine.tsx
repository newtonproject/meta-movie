import { useQuery } from "@apollo/client";
import { parseEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
// import { POLLING_INTERVAL } from "constant/connectors";
import useBlock from "../../hooks/useBlock";
import { useFlowerContract } from "../../hooks/useContract";
import React, { useRef, useState } from "react";
import {
  getBlockUrl,
  hexAddress2NewAddress,
  shortAddress,
} from "../../utils/NewChainUtils";
import transactor from "../../components/transactor";

export default function MovieMine() {
  const { library } = useWeb3React();
  const [tabSelected, setTabSelected] = useState(0);

  const item1 = {
    address: "NEW5154...wdWM",
    time: "1 hour ago",
    name: "The Matrix Resurrections",
    cover: "/assets/image/cover1.png",
    price: "2,000,000 NEW",
    description:
      "Here is the video Description Here is the video Description Here is the video",
    token: "59821724",
  };

  const item2 = {
    address: "NEW5154...wdWM",
    time: "1 hour ago",
    name: "Free Guy",
    cover: "/assets/image/cover2.png",
    price: "2,000,000 NEW",
    description:
      "Here is the video Description Here is the video Description Here is the video",
    token: "59821723",
  };

  const json = {
    "24/5/2022": [item1],
    "23/5/2022": [item2],
    "22/5/2022": [item1, item2],
  };

  const json2 = {
    "24/5/2022": [item1],
    "22/5/2022": [item1, item2],
  };

  function MovieListItem(props) {
    const { date, data } = props;
    return (
      <div className="my-list-item" key={date}>
        <span className="date">{date}</span>
        {data.map((item) => {
          return (
            <div className="item-container">
              <div className="cover-container">
                <img
                  className="cover"
                  src={item.cover}
                  alt="cover"
                  onClick={() => {}}
                />
              </div>
              <div className="info">
                <span className="name">{item.name}</span>
                <span className="token">Token id: {item.token}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function TicketItem(props) {
    const { date, data } = props;
    return (
      <div className="my-list-item" key={date}>
        <span className="date">{date}</span>
        {data.map((item) => {
          return (
            <div className="ticket-container">
              <div className="info">
                <span className="name">{item.name}</span>
                <span className="token">Token id: {item.token}</span>
                <span className="token">Expiration time: {item.time}</span>
              </div>
              <div className="cover-container">
                <img
                  className="cover"
                  src="/assets/image/ticket.png"
                  alt="cover"
                  onClick={() => {}}
                />
              </div>
            </div>
          );
        })}
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
          Object.keys(json).map((date) => {
            return <MovieListItem date={date} data={json[date]} />;
          })
        ) : tabSelected == 1 ? (
          Object.keys(json2).map((date) => {
            return <TicketItem date={date} data={json[date]} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

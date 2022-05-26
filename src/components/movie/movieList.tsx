/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-26 14:21:34
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-26 14:30:51
 * @FilePath: /secure-movie/src/components/movie/movieList.tsx
 * @Description: 
 */
import { useWeb3React } from "@web3-react/core";
import React, {  } from "react";

export default function MovieList() {
  const { library } = useWeb3React();

  const item1 = {
    address: "NEW5154...wdWM",
    time: "1 hour ago",
    name: "Free Guy",
    cover: "/assets/image/cover1.png",
    price: "2,000,000 NEW",
    description:
      "Here is the video Description Here is the video Description Here is the video",
  };

  const item2 = {
    address: "NEW5154...wdWM",
    time: "1 hour ago",
    name: "Free Guy",
    cover: "/assets/image/cover2.png",
    price: "2,000,000 NEW",
    description:
      "Here is the video Description Here is the video Description Here is the video",
  };

  const list = [
    item1,
    item2,
    item1,
    item2,
    item1,
    item2,
    item1,
    item2,
    item1,
    item2,
    item1,
    item2,
  ];

  function MovieListItem(props) {
    const { item } = props;
    return (
      <div className="list-item" key={item.name}>
        <span className="address">{item.address}</span>
        <span className="time">{item.time}</span>
        <span className="name">{item.name}</span>
        <div className="cover-container">
          <img
            className="cover"
            src={item.cover}
            alt="cover"
            onClick={() => {}}
          />
          <button className="preview">Preview</button>
        </div>
        <span className="price">{item.price}</span>
        <span className="description">{item.description}</span>
        <div className="panel">
          <button>Buy</button>
          <span className="">剩余购买次数10次</span>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-container">
      {list.map((item, indexed) => {
        return <MovieListItem key={indexed} item={item} />;
      })}
    </div>
  );
}

/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-26 14:21:34
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-28 18:41:12
 * @FilePath: /secure-movie/src/components/movie/movieList.tsx
 * @Description:
 */
import { useWeb3React } from "@web3-react/core";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MovieList() {
  const { library } = useWeb3React();
  const router = useRouter();

  const item1 = {
    address: "NEW5154...wdWM",
    time: "24 hours",
    name: "Free Guy",
    cover: "/assets/image/cover1.png",
    price: "2,000,000 NEW",
    description:
      "Here is the video Description Here is the video Description Here is the video",
  };

  const item2 = {
    address: "NEW5154...wdWM",
    time: "24 hours",
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

  function openMovieDetail() {
    const props = {
      name: "Ready Player One",
      description:
        "Ready Player One is a 2018 American science fiction adventure film based on Ernest Cline's novel of the same name. Directed by Steven Spielberg, from a screenplay by Zak Penn and Cline, it stars Tye Sheridan, Olivia Cooke..",
      contractAddress: "NEW182XXXXX",
      tokenId: "1",
      tokenStandard: "EVT",
      failureTime: "2020 12 31",
      videoUrl:
        "http://127.0.0.1:8081/ipfs/QmYTXR42voo8orAnnhC4cuPor75QxjHd2X6e4L7QwToTQ5/output.m3u8",
      videoSecret: "d2e8b0d37ad163aec25cad21a6d1202a",
    };
    router.push({
      pathname: "detail",
      query: props,
    });
  }

  function MovieListItem(props) {
    const { item } = props;
    return (
      <div className="list-item" key={item.name}>
        <span className="name">{item.name}</span>
        <div className="cover-container">
          <img
            className="cover"
            src={item.cover}
            alt="cover"
            onClick={() => {
              openMovieDetail();
            }}
          />
          <button className="preview">Preview</button>
        </div>
        <span className="price">{item.price}</span>
        <span className="description">{item.description}</span>
        <div className="panel">
          <Link href="mint" passHref>
            <button>Mint</button>
          </Link>

          <div className="panel-info">
            <span className="bold">10 times</span>
            <span className="normal">Remaining Mints</span>
          </div>
        </div>
        <span className="time">Valid time after purchase: {item.time}</span>
        <div className="user">
          <img className="user-icon" src="/assets/image/user.png" alt="user" />
          <span className="address">{item.address}</span>
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

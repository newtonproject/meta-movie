/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-28 16:39:52
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 18:10:21
 * @FilePath: /secure-movie/src/pages/detail.tsx
 * @Description:
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import VideoComponent from "components/movie/video";
import { useWeb3React } from "@web3-react/core";
import { injected } from "constant/connectors";
import Http from "services/http";
import { CheckSecretParams } from "model";
import { newAddress2HexAddress, shortAddress } from "utils/NewChainUtils";
import { splitSignature } from "@ethersproject/bytes";
import { TARGET_CHAINID } from "constant/settings";
import { formatEther, parseEther } from "@ethersproject/units";
import { useSecureMovieContract } from "hooks/useContract";
import transactor from "components/transactor";
import { Button, Upload, UploadProps, message } from "antd";

export default function MovieDetail(props) {
  const router = useRouter();
  const playerRef = useRef(null);
  const { library, account, active, activate } = useWeb3React();
  const [locked, setLocked] = useState(true);
  const [videoSecret, setVideoSecret] = useState("");
  const [cover, setCover] = useState("");
  const secureMovieContract = useSecureMovieContract();

  const {
    name,
    description,
    contractAddress,
    tokenId,
    tokenStandard,
    failureTime,
    videoUrl,
    coverImage,
    hasTicket,
    price,
    ticketAddress
  } = router.query;

  useEffect(() => {
    if (coverImage) {
      setCover(coverImage.toString());
    }
  });

  function encryptionCallback(key) {
    var data = Buffer.from(videoSecret.toString());
    var dataView = new DataView(data.buffer);
    const bytes = new Uint32Array([
      dataView.getUint32(0),
      dataView.getUint32(4),
      dataView.getUint32(8),
      dataView.getUint32(12),
    ]);
    return bytes;
  }

  function check() {
    if (hasTicket === "false") {
      buyTickets()
      return
    }
    try {
      let info = parseInt((Date.now() / 1000).toString()).toString();
      let message = {
        domain: {
          name: "SecureMovie",
          verifyingContract: "0x0000000000000000000000000000000000000000",
          version: "1",
        },
        message: {
          timestamp: info,
        },
        primaryType: "SignMessage",
        types: {
          EIP712Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "verifyingContract", type: "address" },
          ],
          SignMessage: [{ name: "timestamp", type: "string" }],
        },
      };

      if (library === undefined) {
        return;
      } else {
        library
          .send("eth_signTypedData_v4", [account, JSON.stringify(message)])
          .then(splitSignature)
          .then((signature) => {
            const params = new CheckSecretParams();
            params.token_id = tokenId.toString();
            params.contract_address =
              newAddress2HexAddress(contractAddress).toString();
            params.sign_message = JSON.stringify(message);
            params.sign_r = signature.r;
            params.sign_s = signature.s;
            params.sign_v = signature.v;
            Http.getInstance()
              .secretCheck(params)
              .then((res) => {
                console.log(res);
                if (res.error_code == 1) {
                  setVideoSecret(res.result.secret);
                  setLocked(false);
                } else {
                  alert(res.error_message);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            // for all errors other than 4001 (EIP-1193 user rejected request), fall back to manual approve
            if (error?.code !== 4001) {
              console.log(error);
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function buyTickets() {
    const movieId = tokenId;
    console.log(parseEther(price.toString()));
    console.log(parseEther(price.toString()));

    const overrides = {
      value: price.toString(),
    };
    const transaction = secureMovieContract.buyTicket(
      movieId,
      ticketAddress,
      1,
      overrides
    );
    transactor(transaction, () => {
      message.success(`purchase successfully`, 3);
      router.push({
        pathname: "/",
        query: null,
      });
    });
  }

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoUrl + "/output.m3u8",
        type: "application/x-mpegURL",
      },
    ],
    html5: {
      vhs: {
        cacheEncryptionKeys: true,
        externalEncryptionKeysCallback: encryptionCallback,
      },
    },
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // You can handle player events here, for example:
    player.on("waiting", () => {
      player.log("player is waiting");
    });

    player.on("dispose", () => {
      player.log("player will dispose");
    });
  };

  const handleAddress = () => {
    if (typeof contractAddress === "string" && contractAddress !== "") {
      console.log(contractAddress);
      return (
        contractAddress.substring(0, 5) +
        "..." +
        contractAddress.substring(contractAddress.length - 5)
      );
    } else {
      return contractAddress;
    }
  };

  return (
    <div className="detail-container">
      <Link href="/" passHref>
        <img className="back" src="/assets/image/back_white.png" alt="" />
      </Link>
      <div className="detail">
        {locked ? (
          <>
            <div className="cover-container">
              <img className="movie-cover" src={cover} alt="" />
              <div className="cover"></div>
              {active ? (
                <button
                  className="preview"
                  onClick={() => {
                    check();
                  }}
                >
                  {hasTicket === "true" ? "unlock" : "Buy"}
                </button>
              ) : (
                <button
                  className="preview"
                  onClick={() => {
                    activate(injected);
                  }}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </>
        ) : (
          <VideoComponent
            options={videoJsOptions}
            onReady={handlePlayerReady}
          />
        )}

        <div className="information">
          <div className="name">{name}</div>
          <div className="desc">
            <div className="title">Description</div>
            <div className="content">{description}</div>
          </div>
          <div className="chain">
            <div className="title">Detail</div>
            <div className="content">
              <div className="item">
                <div className="item-title">Contract Address</div>
                <div className="item-content">
                  {shortAddress(contractAddress)}
                </div>
              </div>
              <div className="item">
                <div className="item-title">Token ID</div>
                <div className="item-content">{tokenId}</div>
              </div>
              <div className="item">
                <div className="item-title">Token Standard</div>
                <div className="item-content">{tokenStandard}</div>
              </div>
              <div className="item">
                <div className="item-title">Blockchaiin</div>
                <div className="item-content">Newton</div>
              </div>
            </div>
          </div>

          {/* <div className="extra">
            <div className="title">Expiration Time</div>
            <div className="content">{failureTime}</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-28 16:39:52
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 00:48:16
 * @FilePath: /secure-movie/src/pages/detail.tsx
 * @Description:
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import VideoComponent from "components/movie/video";
import { useWeb3React } from "@web3-react/core";
import { injected } from "constant/connectors";
import Http from "services/http";
import { CheckSecretParams } from "model";
import { getSignatureDetail } from "utils";

export default function MovieDetail(props) {
  const router = useRouter();
  const playerRef = useRef(null);
  const { library, account, active, activate } = useWeb3React();
  const [locked, setLocked] = useState(true);
  const [videoSecret, setVideoSecret] = useState("");

  const {
    name,
    description,
    contractAddress,
    tokenId,
    tokenStandard,
    failureTime,
    videoUrl,
    coverImage,
  } = router.query;

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
    try {
      let message = parseInt((Date.now() / 1000).toString()).toString();
      let request = {
        jsonrpc: "2.0",
        id: 2,
        method: "personal_sign",
        params: [message, account],
      };
      if (
        library === undefined &&
        library.provider === undefined &&
        library.provider.sendAsync === undefined
      ) {
        return;
      } else {
        library.provider.sendAsync(request, (error, response) => {
          if (response) {
            const { r, s } = getSignatureDetail(response.result);
            const params = new CheckSecretParams();
            params.token_id = tokenId.toString();
            params.contract_address = contractAddress.toString();
            params.sign_message = message;
            params.sign_r = r;
            params.sign_s = s;
            console.log(params);
            Http.getInstance()
              .secretCheck(params)
              .then((res) => {
                console.log(res);
                setVideoSecret(res.result.secret);
                setLocked(false);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("get balance error:" + error);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoUrl,
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

  return (
    <div className="detail-container">
      <Link href="/" passHref>
        <img className="back" src="/assets/image/back.png" alt="back" />
      </Link>
      <div className="detail">
        {locked ? (
          <>
            <div className="cover-container">
              <img className="movie-cover" src={coverImage} alt="cover" />
              <div className="cover"></div>
              {active ? (
                <button
                  className="preview"
                  onClick={() => {
                    check();
                  }}
                >
                  unlock
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
                <div className="item-content">{contractAddress}</div>
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

          <div className="extra">
            <div className="title">Failure Time</div>
            <div className="content">{failureTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

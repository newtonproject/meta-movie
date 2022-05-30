/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-28 16:39:52
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-30 20:07:28
 * @FilePath: /secure-movie/src/pages/detail.tsx
 * @Description:
 */

import { useRef, useState } from "react";
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

  // const {
  //   name,
  //   description,
  //   contractAddress,
  //   tokenId,
  //   tokenStandard,
  //   failureTime,
  //   videoUrl,
  //   videoSecret,
  // } = router.query;

  const a = {
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

  const {
    name,
    description,
    contractAddress,
    tokenId,
    tokenStandard,
    failureTime,
    videoUrl,
    videoSecret,
  } = a;

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
      let message = "asdfalksdfjlaskdfjl";
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
            console.log(response);
            console.log(r, s);
            const params = new CheckSecretParams();
            params.token_id = tokenId;
            params.contract_address = "";
            params.sign_message =
              "Ethereum Signed Message:\n" + message.length + message;
            params.sign_r = r;
            params.sign_s = s;
            console.log(params);

            // const password = Http.getInstance().secretCheck(params);
            setLocked(false);
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
      <div className="detail">
        {locked ? (
          <>
            {active ? (
              <button
                onClick={() => {
                  check();
                }}
              >
                unlock
              </button>
            ) : (
              <button
                onClick={() => {
                  activate(injected);
                }}
              >
                connectWallet
              </button>
            )}
          </>
        ) : (
          <VideoComponent
            options={videoJsOptions}
            onReady={handlePlayerReady}
          />
        )}

        <div className="information">
          <div className="desc">
            <div className="title">Description</div>
            <div className="content">{description}</div>
          </div>
          <div className="chain">
            <div className="title">Detail</div>
            <div className="content">
              <div className="item">
                <div>contract address</div>
                <div>{contractAddress}</div>
              </div>
              <div className="item">
                <div>TokenId</div>
                <div>{tokenId}</div>
              </div>
              <div className="item">
                <div>TokenStandard</div>
                <div>{tokenStandard}</div>
              </div>
              <div className="item">
                <div>BlockChaiin</div>
                <div>Newton</div>
              </div>
            </div>
          </div>

          <div className="extra">
            <div className="title">FailureTime</div>
            <div className="content">{failureTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

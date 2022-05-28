/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-28 16:39:52
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-28 18:46:22
 * @FilePath: /secure-movie/src/pages/detail.tsx
 * @Description:
 */

import { useEffect, useRef } from "react";

export const VideoComponent = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    let player;
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      // @ts-ignore
      player = playerRef.current = videojs(videoElement, options, () => {
        player.log("player is ready");
        onReady && onReady(player);
      });
      // You can update player in the `else` block here, for example:
    } else {
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="video-container">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered video"
        />
      </div>
    </div>
  );
};
import { useRouter } from "next/router";

export default function MovieDetail(props) {
  const router = useRouter();

  const {
    name,
    description,
    contractAddress,
    tokenId,
    tokenStandard,
    failureTime,
    videoUrl,
    videoSecret,
  } = router.query;

  const playerRef = useRef(null);

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

  const videoJsOptions = {
    autoplay: true,
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
        <VideoComponent options={videoJsOptions} onReady={handlePlayerReady} />
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

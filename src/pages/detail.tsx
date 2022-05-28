/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-27 14:29:53
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-28 16:06:22
 * @FilePath: /secure-movie/src/pages/detail.tsx
 * @Description:
 */
import { useEffect, useRef } from "react";

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const player = (playerRef.current = videojs(videoElement, options, () => {
        player.log("player is ready");
        onReady && onReady(player);
      }));
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
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default function MovieDetail(props) {
  const playerRef = useRef(null);

  function encryptionCallback(key) {
    var data = Buffer.from("d2e8b0d37ad163aec25cad21a6d1202a");
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
        src: "http://127.0.0.1:8081/ipfs/QmYTXR42voo8orAnnhC4cuPor75QxjHd2X6e4L7QwToTQ5/output.m3u8",
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
    <div className="detail">
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div className="information">
        <div className="desc">
          <div className="title">Description</div>
          <div className="content">
            Here is the video Description Google Translate is a service for
            translating texts and web pages started by Google in 2006.
          </div>
        </div>
        <div className="chain">
          <div className="title">Detail</div>
          <div className="content">
            <div className="item">
              <div>contract address</div>
              <div>NEW182XXX</div>
            </div>
            <div className="item">
              <div>TokenId</div>
              <div>123</div>
            </div>
            <div className="item">
              <div>TokenId</div>
              <div>123</div>
            </div>
            <div className="item">
              <div>TokenStandard</div>
              <div>EVT</div>
            </div>
            <div className="item">
              <div>BlockChaiin</div>
              <div>Newton</div>
            </div>
          </div>
        </div>

        <div className="extra">
          <div className="title">FailureTime</div>
          <div className="content">23/5/2022 23:00</div>
        </div>
      </div>
    </div>
  );
}

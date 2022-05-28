/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-27 14:29:53
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-28 14:56:45
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
    return new Uint32Array([2911908225, 1042915255, 4112562800, 3204785626]);
  }

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://ipfs.devnet.andverse.org/ipfs/QmSsCP4wejRU44Qe4wxbpAtBnAqjxdPmWh5kAQMttHxtFr/output.m3u8",
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
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
}

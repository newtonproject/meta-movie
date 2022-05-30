/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-30 15:57:16
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-30 15:58:08
 * @FilePath: /secure-movie/src/components/movie/video.tsx
 * @Description:
 */
import { useEffect, useRef } from "react";

const VideoComponent = (props) => {
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

export default VideoComponent;

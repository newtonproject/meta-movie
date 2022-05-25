/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-20 14:33:36
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-20 14:33:39
 * @FilePath: /cryptofamily-website/src/hooks/usePooler.ts
 * @Description:
 */
import { useEffect, useRef } from "react";

// helper hook to call a function regularly in time intervals

export default function usePoller(fn, delay, extraWatch) {
  const savedCallback = useRef<any>();
  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => {
      clearInterval(id);
    };
  }, [fn]);
  useEffect(() => {
    fn();
  }, [fn]);
}

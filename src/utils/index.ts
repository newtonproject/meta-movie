/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-20 12:12:20
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-20 12:13:21
 * @FilePath: /cryptofamily-website/src/utils/index.ts
 * @Description:
 */
import axios from "axios";

export async function getInfo(url) {
  try {
    if (url.startsWith("data:application/json;base64,")) {
      let data = url.split("data:application/json;base64,")[1];
      const res = JSON.parse(decodeURIComponent(escape(atob(data))));
      return res;
    }
    const result = await axios.get(url);
    return result.data;
  } catch (e) {
    try {
      const res = await axios.get(`/api/proxy?url=${url}`);
      return res.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

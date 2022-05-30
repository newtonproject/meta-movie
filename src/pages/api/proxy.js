/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-30 21:30:11
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 00:23:16
 * @FilePath: /secure-movie/src/pages/api/proxy.js
 * @Description:
 */

import axios from "axios";

export default (req, res) => {
  const { url } = req.query;
  axios
    .get(url)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(`error url is: ${url}`);
      res.status(400).json(error);
    });
};

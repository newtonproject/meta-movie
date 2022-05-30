/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-30 21:36:33
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-30 21:47:57
 * @FilePath: /secure-movie/src/pages/api/upload.js
 * @Description:
 */
import axios from "axios";
import { create } from "ipfs-http-client";

export default async (req, res) => {
  const data = req.body;
  const ipfsClient = create({ url: "https://ipfs.devnet.newtonproject.org/" });
  const cidInfo = await ipfsClient.add(JSON.stringify(data));
  res.status(200).json(cidInfo);
};

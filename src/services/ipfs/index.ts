/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-30 20:13:25
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-30 21:21:42
 * @FilePath: /secure-movie/src/services/ipfs/index.ts
 * @Description:
 */

import { NEXT_PUBLIC_MOVIE_IPFS } from "constant/settings";
import { create } from "ipfs-http-client";

const ipfsClient = create({ url: "https://ipfs.devnet.newtonproject.org/" });

export default ipfsClient;

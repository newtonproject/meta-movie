/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-30 14:35:33
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-31 17:52:47
 * @FilePath: /secure-movie/src/model/index.ts
 * @Description:
 */
export class CheckSecretParams {
  token_id: string;
  contract_address: string;
  sign_r: string;
  sign_s: string;
  sign_v: string;
  sign_message: string;
}

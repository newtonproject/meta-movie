/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-30 14:35:33
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-30 14:38:32
 * @FilePath: /secure-movie/src/model/index.ts
 * @Description: 
 */
export class CheckSecretParams {
  token_id: string;
  contract_address: string;
  sign_r: string;
  sign_s: string;
  sign_message: string;
}
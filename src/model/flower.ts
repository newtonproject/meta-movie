/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-23 14:50:01
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-24 12:06:39
 * @FilePath: /infinity-flower/src/model/flower.ts
 * @Description:
 */
export interface FlowerList {
  flowers: Array<Flower>;
}

export class Flower {
  id: string;
  contract: Contract;
  tokenId: string;
  minter: string;
  mintTx: string;
  mintTime: string;
  mintBlock: string;
  owner: Owner;
  properties: Array<Property>;
  memories: Array<Memory>;
}

export class Contract {
  id: string;
  name: string;
  symbol: string;
}

export class Owner {
  id: string;
}

export class Property {
  id: string;
  propertyId: string;
  propertyValue: string;
  amount: string;
}

export class Memory {
  id: string;
  propertyId: string;
  propertyValue: string;
  valueIncrease: string;
  amount: string;
  account: Account;
  time: string;
  block: string;
}

export class Account {
  id: string;
}

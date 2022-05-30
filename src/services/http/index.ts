import axios from "axios";
import { CheckSecretParams } from "model";

export const Api = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL + "/api/v1",
  upload: "/secret/upload/",
  check: "/secret/check/",
};

const ajax = axios.create({
  baseURL: Api.baseUrl,
  timeout: 15000,
});

function _get(url) {
  return new Promise(function (resolve, reject) {
    ajax
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.statusText);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function _post(url, params) {
  return new Promise(function (resolve, reject) {
    ajax
      .post(url, params)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.statusText);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

let instance = null;

class Http {
  static getInstance() {
    if (instance === undefined || instance === null) {
      instance = new Http();
    }
    return instance;
  }

  uploadFile(file) {
    return _post(Api.upload, file);
  }

  secretCheck(data: CheckSecretParams) {
    return _post(Api.check, data);
  }
}

export default Http;
